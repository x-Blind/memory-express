import pool from './dbconfig.js';

async function addProduct(product_name,price,size,unit,flavor,stock,description,image_url){
    await pool.query(`INSERT INTO products (product_name,price,size,
        unit,flavor,stock,description,image_url) VALUES (?,?,?,?,?,?,?,?)`
        ,[product_name,price,size,unit,flavor,stock,description,image_url])
}

export {addProduct};