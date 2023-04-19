import express from 'express'

const router = express.Router();

router.get('', (req, res) => {
    res.send("WELCOME!!!")
})

export {router as homePageRouter} // export router and rename it as homePageRoute