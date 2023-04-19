import express from 'express'
import 'express-async-errors' // lets async functions work with thrown errors without changing code
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { homePageRouter } from './routes/homepage'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true)  // ingress proxies traffic to express

app.use(json())
app.use(cookieSession({
    signed: false,
    secure: true
}))

// Routes
app.use(homePageRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(currentUserRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler) // error handler should be the last middleware to be mounted

export { app }
