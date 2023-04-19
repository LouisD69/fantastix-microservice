import express, {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Something went wrong", err)

    if(err instanceof CustomError){ // Custom Error is the abstract class that all other types of error extends
        return res.status(err.statusCode).send(err.serializeErrors())
    }

    return res.status(500).send({errors: [{message:"something went wrong"}]})
}