import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: any

// before running any test
beforeAll(async () => {
    // assign necessary env variables
    process.env.JWT_KEY = "abcd"

    // startup mongo server 
    mongo = await MongoMemoryServer.create()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {})
})

// right before every test
beforeEach(async () => {
    // delete db contents 
    const collections = await mongoose.connection.db.collections()

    for(let collection of collections){
        await collection.deleteMany({})
    }
})

// when all tests are done
afterAll(async () => {
    //  stop mongodb
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})