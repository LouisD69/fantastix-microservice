import express, { Request, Response } from 'express'
import { currentUserHandler } from '../middlewares/current-user-handler';

const router = express.Router();

router.get('/api/users/currentuser', 
    currentUserHandler, // current user handler middleware
    (req: Request, res: Response) => {
        return res.send({currentUser: req.currentUser || null})
    }
)

export {router as currentUserRouter} // export router with renaming