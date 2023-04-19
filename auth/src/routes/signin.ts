import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../utils/password';
import { validateRequest } from '../middlewares/request-validator';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin', [ // this is a middleware, which is the express-validator 
    body('email') // look for "email" in the http body
        .isEmail() // check if its a valid email
        .withMessage("Must be a valid email"), // returns this error message if not an email
    body('password')
        .trim() // make sure there is no leading or trailing spaces
    ], 
    validateRequest, // get the list of errors from request-validator middleware
    async (req: Request, res: Response) => {

        const {email, password} = req.body // extract info from email body
        
        // check if email exists, throw an error if yes
        const user = await User.findOne({ email }) 
        if(!user){
            throw new BadRequestError('Incorrect Email or Password')
        }

        // user exists, but check if the password is correct
        const pwMatch = await Password.compare(user.get('password'), password)
        if(!pwMatch){
            throw new BadRequestError('Incorrect Email or Password')
        }

        // create session cookie/jwt
        const payload = { // payload is the information stored in JWT
            id: user.id,
            email: user.email
        }
        const jwToken = jwt.sign(payload, process.env.JWT_KEY!) // use the secret jwt key as sign key
        req.session = {  // store jwt in Request Session property
            jwt: jwToken 
        } 

        res.status(200).send(user)
    }
)

export {router as signInRouter} // export router with renaming