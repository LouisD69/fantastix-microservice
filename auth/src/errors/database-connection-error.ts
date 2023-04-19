import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500
    reason = "Failed to connect to database"

    constructor(){
        super('Error Connecting to DB')

        // only because we are extending a builtin class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors = () => {
        return [ {message: this.reason}  ]
    }
}