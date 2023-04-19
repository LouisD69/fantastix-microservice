import mongoose from "mongoose"
import { app } from "./app"

const port = 3000

const start = async () => {
    // check first if the env key exists (TS is strict with this)
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is not defined")
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-cip:27017/auth')
        console.log("Successful Connection")
    }catch(err){
        console.log(err)
    }

    app.listen(port, () => {
        console.log(`Listening at ${port}!!!!!`)
    })
}

start()
