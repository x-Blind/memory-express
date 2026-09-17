import express from 'express'

let router = express.Router();


router.get(['/','/home'],(req,res,next)=>{
    res.render('home')
    next();
})

export default router;