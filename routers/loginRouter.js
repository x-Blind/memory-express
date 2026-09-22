import express from 'express';
import {login} from '../database/customers.js';
import jwt from 'jsonwebtoken';
let router = express.Router();

router.get('/', (req,res,next)=> {
    if(res.locals.isHtmx){
        return res.render('partials/login', {hx:true, title:'LOGINHTMX', result:false} )
    }
    res.render('app', {hx:false, title:'LOGINHTML', page:'login', result:false} )
})

router.post('/', async (req,res,next)=>{
    let {email,password}= req.body;
    let result = await login(email,password,refresh_Token,'customer')
    //handle sucess cases
    if(result.message == 'logged'){
        let refresh_Token = jwt.sign(
        {email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
        )
        let access_Token = jwt.sign(
        {email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30s'}
        )
        res.cookie('access_Token',  access_Token,  {httpOnly:true, maxAge:1000*60*60*24})
        res.cookie('refresh_Token', refresh_Token, {httpOnly:true, maxAge:1000*60*60*24})
        if(res.locals.isHtmx){
            res.set('HX-Redirect', '/home');
            return res.send('');
        }
        else{
            return res.redirect('/home')
        }
    }
        else{//handle failed cases
        if(res.locals.isHtmx){
            res.render('partials/login', {hx:true, title:'LOGINHTMX', result})
        }
        else{
            res.render('app',{hx:false, title:'LOGINHTML', page:'login', result})
        }
    }
})

export default router;













// result = {message:'logged'} result.message = logged
// result = [{message:'logged'},{message1:'logged1'}] = result[1].message1 = logged1
