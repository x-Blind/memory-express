import express from 'express';
import bcrypt from 'bcrypt';
import {register} from '../database/customers.js'
let router = express.Router();


router.get('/', (req,res,next)=> {
    res.render('register',{title:'register',result:null})
    next();
})

router.post('/', async (req,res,next)=> {
    let {email,password} = req.body;
    let result= await register(email,'customer',password) // result = {message:'Registration successful'} 
    res.render('register',{
        result 
    })

})

export default router;