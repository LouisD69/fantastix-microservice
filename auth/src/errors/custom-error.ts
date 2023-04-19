import { ValidationError } from "express-validator"

export abstract class CustomError extends Error{
    abstract statusCode: number
    abstract serializeErrors():{
        message: string,
        field?: string
    }[]

    constructor(message: string){
        super(message)

        // only because we are extending a builtin class
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}