import { CustomError } from "./custom-error"

export class NotFoundError extends CustomError{
    statusCode = 404
    reason = "Page was not found"

    constructor(){
        super('Page not found')

        // only because we are extending a builtin class
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors = () => {
        return [{message: this.reason}]
    }
}