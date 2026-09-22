import express from 'express'

let router = express.Router();


router.get('/',(req,res,next)=>{
    if(res.locals.isHtmx){
        return res.render('partials/products', {hx:true, title:'PRODUCTSHTMX'} )
    }
    res.render('app', {hx:false,title:'PRODUCTSHTML', page:'products', } )
})


export default router;