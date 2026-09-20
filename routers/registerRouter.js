import express from 'express';
import bcrypt from 'bcrypt';
import {register} from '../database/customers.js'
let router = express.Router();


router.get('/', (req,res,next)=> {
    if(req.headers['hx-request']){
        return res.render('partials/register',{hx:true,title:'registerhtmx',result:null})
    }

    res.render('app',{hx:false, page:'register', title:'register',result:null})
})

router.post('/', async (req,res,next)=> {
    let {email,password} = req.body;
    let result= await register(email,'customer',password) // result = {message:'Registration successful'} 
    res.render('register',{
        result 
    })

})

export default router;