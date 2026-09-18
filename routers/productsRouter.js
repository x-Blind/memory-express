import express from 'express'

let router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('products',{title:'products'})
    next()
})


export default router;