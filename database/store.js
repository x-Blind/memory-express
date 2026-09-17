import pool from './dbconfig.js'


await pool.query(`
    DROP DATABASE store;
    CREATE DATABASE store;
    USE store;
    CREATE TABLE customers(
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    password VARCHAR(100),
    role ENUM('admin','editor','customer','guest') NOT NULL 
);`)
let [rows,cols]= await pool.query(`SELECT * FROM customers`)
console.log(rows,cols)