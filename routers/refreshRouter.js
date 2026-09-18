import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database/dbconfig.js';
let router = express.Router()

router.post('/', (req,res,next)=> {
    let refresh_Token = req.cookies.jwt;
    if(!refresh_Token) return res.sendStatus(401)
    jwt.verify(
        refresh_Token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err,decoded)=> {  
            if(err) return res.sendStatus(401)
            let email = decoded.email;
            try{
                let [rows,cols]= await pool.query(`SELECT refresh_Token FROM customers WHERE email = ? `,[email])
            if(rows[0].refresh_Token!=refresh_Token) return res.sendStatus(401)
            let access_Token =jwt.sign(
                {email},
                process.env.ACCESS_TOKEN_SECRET,
                {"expiresIn":'30s'}
                ) 
            res.json(access_Token)
            }
            catch(err){
                res.json({'error':err.message})
            }
            next()
            
        }
    )
})

export default router;