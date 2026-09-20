import express from 'express';
import {login} from '../database/customers.js';
import jwt from 'jsonwebtoken';
let router = express.Router();

router.get('/', (req,res,next)=> {
    if(req.headers['hx-request']=== 'true'){
        return res.render('partials/login', {hx:true, title:'loginhtmx', result:null} )
    }
        res.render('app', {hx:false, page:'login', title:'login',result:null} )
})

router.post('/', async (req,res,next)=>{
    let {email,password}= req.body;
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
    res.cookie('jwt',refresh_Token,{httpOnly:true, maxAge:1000*60*60*24})
    let result = await login(email,password,refresh_Token,'customer')
    res.json(access_Token)
    //res.render('login',{result})
})

export default router;













// result = {message:'logged'} result.message = logged
// result = [{message:'logged'},{message1:'logged1'}] = result[1].message1 = logged1
