import { CustomError } from "./custom-error"

export class BadRequestError extends CustomError{
    statusCode = 400

    constructor(public reason:string){
        super(reason)

        // only because we are extending a builtin class
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors = () => {
        return [{message: this.reason}]
    }
}