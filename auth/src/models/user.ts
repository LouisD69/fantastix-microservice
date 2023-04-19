import mongoose, { Model } from "mongoose";
import { Password } from "../utils/password";

// interface to tells TS what properties a mongoose schema have
interface UserProps{
    email: string,
    password: string
}

// interface to tell TS that the User Model will have a function called "build"
interface UserModel extends mongoose.Model<any>{
    build(props:UserProps): UserDoc
}

// interface to tell TS what properties a mongoose document have
interface UserDoc extends mongoose.Document{
    email:string,
    password:string
}

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            
        },
        password: {
            type: String,
            required: true
        }
    },
    { 
        toJSON: { // overrides toJSON
            transform(doc, ret){ // hide/modify properties when logging mongo document
                ret.id = ret._id 
                delete ret._id
                delete ret.password
                delete ret.__v 
            }
        }
    }
)

// add a "build" function to the userschema
// name of function does not to be build
userSchema.statics.build  = (props: UserProps) => {
    return new User(props)
}

// pre is a hook that acts as middleware for mongoose
// it will run the specified function before saving record to DB
userSchema.pre('save', async function(done){
    // isModified is a mongoose builtin
    if(this.isModified('password')){ // check if the password was changed (signup, change pass feature)
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done() 
})

// the model used for creating a user data
const User = mongoose.model<UserDoc, UserModel>('User', userSchema) 

export { User } 