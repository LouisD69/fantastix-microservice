import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request-error';

interface UserPayload{
    email: string,
    password: string
}

declare global{ // tell typescript that we will add a property
    namespace Express{
        interface Request{ // in the Request interface
            currentUser?: UserPayload // called currentUser with type UserPayload
        }
    }
}

export const currentUserHandler = (req: Request, res: Response, next: NextFunction) => {
    // check if session cookie exists
    if(!req.session?.jwt){ // if session exists and it contains a jwt
        return res.send({currentUser: null})
    }

    // verify jwt
    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload 
    }catch(err){
        throw new BadRequestError('Bad Cookies')
        //return res.send({currentUser: null}) // if jwt is unverified/tampered
    }

    next() // call next because this is not the last middleware?
}