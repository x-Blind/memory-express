import mysql from 'mysql2';

let pool = mysql.createPool(
    {
        host:`127.0.0.1`,
        user:'root',
        password:`${process.env.DBPASSWORD}`,
        database:'store'
    }
).promise();


export default pool;
