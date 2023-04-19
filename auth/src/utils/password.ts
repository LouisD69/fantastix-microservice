import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt) // converts function to a promise maker

export class Password{
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex')  // 8 bytes of salt
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer
        return `${buffer.toString('hex')}.${salt}`
    }
    
    static async compare(storedPass: string, inputPass: string){
        const [hashedPass, salt] = storedPass.split('.')
        const buffer = (await scryptAsync(inputPass, salt, 64)) as Buffer // hash the input password
        return buffer.toString('hex') === hashedPass // compare hashed input pass and saved hash pass
    }
}