import express from 'express'
import jwt from 'jsonwebtoken';
let router = express.Router();
//we have 4 cases 
//1 = first visit using html no welcome
//2= redirect from login using html with welcome 
//3= redirect from login using htmx with welcome
//4= visit with htmx no welcome msg
router.get(['/','/home'],(req,res,next)=>{
    try{
        let refresh_Token = req.cookies.refresh_Token;
        let decoded = jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_SECRET)
        let email = decoded.email;

        // if logged
        if(email){ 
        if(res.locals.isHtmx){
            return res.render('partials/home', {hx:true, title:'HOMEHTMX', email })
        }
        else{
            return res.render('app', {hx:false, title:'HOMEHTML', page:'home', email})
        }}
    }
    catch(err){
        notLogged()
    }
    function notLogged(){
        let email = false;
        if(res.locals.isHtmx){
            return res.render('partials/home', {hx:true, title:'HOMEHTMX', email })
        }
        else{
            return res.render('app', {hx:false, title:'HOMEHTML', page:'home', email })
        }
    }

})



export default router;

//, "historyCacheSize": 0