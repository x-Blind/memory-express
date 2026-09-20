import express from 'express'

let router = express.Router();


router.get('/',(req,res,next)=>{
    if(req.headers['hx-request'] === 'true'){
        return res.render('partials/products', {hx:true, title:'productshtmx'} )
    }
    res.render('app', {hx:false, page:'products', title:'products'} )
})


export default router;