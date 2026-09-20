import express from 'express'

let router = express.Router();


router.get(['/','/home'],(req,res,next)=>{
    if (req.headers['hx-request'] === 'true'){
        return res.render('partials/home', {hx:true, title:'homehtmx'} )
    }
    res.render('app', {hx:false, page:'home', title:'homehtml'} )
})

export default router;