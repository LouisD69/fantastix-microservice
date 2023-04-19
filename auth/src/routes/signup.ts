import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/request-validator';

const router = express.Router();

router.post('/api/users/signup', [ // this is a middleware, which is the express-validator 
        body('email') // look for "email" in the http body
            .isEmail() // check if its a valid email
            .withMessage("Must be a valid email"), // returns this error message if not an email
        body('password')
            .trim() // make sure there is no leading or trailing spaces
            .isLength({min: 4, max: 16}) // 4 to 20 chars    
            .withMessage('Password must be 4 to 20 characters long')
    ], 
    validateRequest, // get the list of errors from request-validator middleware
    async (req: Request, res: Response) => {
        const {email, password} = req.body // extract info from email body
        
        // check if email exists, throw an error if yes
        const userExists = await User.findOne({ email }) 
        if(userExists){
            throw new BadRequestError('Email is already in use')
        }

        // if no error, create a user record using the user scheme we created
        const user = User.build({ 
            email: email,
            password: password // User schema code contains the password hashing logic
        })

        // create JWT and the information to store in it
        const payload = { // payload is the information stored in JWT
            id: user.id,
            email: user.email
        }

        const jwToken = jwt.sign(payload, process.env.JWT_KEY!) // use the secret jwt key as sign key

        // store jwt in Request Session property
        req.session = {
            jwt: jwToken 
        } 
        
        await user.save() // save to DB
        console.log("Created new account!")
        res.status(201).send(user)
})

export {router as signUpRouter} // export router with renaming