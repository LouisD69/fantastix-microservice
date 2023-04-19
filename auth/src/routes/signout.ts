import express from 'express'

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    req.session = null // delete session info
    res.send({})
})

export {router as signOutRouter} // export router with renaming