import express from 'express';
import bcrypt from 'bcrypt';
import {register} from '../database/customers.js'
let router = express.Router();


router.get('/', (req,res,next)=> {
    if(res.locals.isHtmx){
        return res.render('partials/register',{hx:true,title:'REGISTERHTMX',result:false})
    }
    res.render('app',{hx:false, title:'REGISTERHTML', page:'register', result:false})
})

router.post('/', async (req,res,next)=> {
    let {email,password} = req.body;
    let result= await register(email,'customer',password) 
    // result = {message:'Registration successful'} 
    if(res.locals.isHtmx){
        return res.render('partials/register',
        {hx:true,title:'REGISTER', result })
    }
    res.render('app',{hx:false, title:'REGISTER', page:'register', result  })
})

export default router;
//, "historyCacheSize": 0}