import pool from './dbconfig.js';
import bcrypt from 'bcrypt';


async function register(...data){ // (EMAIL,ROLE,PASSWORD) OR (EMAIL,ROLE) 
        let email = data[0]
        let role = data[1]
    if(data.length == 3){ // email + password + role
        try {
            let password = data[2]
            if(password.length == 0) throw new Error ('Please Enter A Valid Password');
            let hashedPassword = await bcrypt.hash(password,12);
            await pool.query(`INSERT INTO customers (email,password,role) values (?,?,?)`,[email,hashedPassword,role])
            return {message:'Registration successful'}
        } 
        catch (error) {
            return {'error':error.message};
        }

    }
    else{ // fake email + role
        await pool.query(`INSERT INTO customers (email,role) values (?,?)`,[email,role])
    }

}



async function login(email,password,refresh_Token){
        let [rows,colmuns]= await pool.query(`SELECT * FROM customers WHERE email = ?`,[email])
        let user = rows[0]
        if(!user) return {message:'Email was not found'};
        if(user){
            let match = await bcrypt.compare(user.password,password)
            if(!match) return {message:'Wrong Password'};
            await pool.query(`UPDATE customers SET refresh_Token = ? WHERE email = ?`, [refresh_Token,email])
            return {message:'logged'};
        }
}


export {register,login};