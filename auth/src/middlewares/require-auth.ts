import express, {Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // check if session cookie exists
    if(!req.currentUser){ // if session exists and it contains a jwt
        throw new NotAuthorizedError()
    }

    next() // call next because this is not the last middleware?
}