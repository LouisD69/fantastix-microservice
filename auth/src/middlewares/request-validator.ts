import express, {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    // get the list of errors from express-validator
    const errors = validationResult(req) 
        
    // if errors exist, throw an error
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    next() // call next because this is not the last middleware?
}