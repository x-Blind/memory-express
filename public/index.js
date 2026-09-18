let home = document.getElementById('home');
let products = document.getElementById('products');
let login = document.getElementById('login');
let register = document.getElementById('register');
console.log(home)
home.addEventListener('click', async (event)=> {
    let response = await fetch('/home',{
        method :'GET',
    })
    console.log(response)
    let result = await response.json()
    console.log(result)
})

products.addEventListener('click', async (event)=> {
    let response = await fetch('/products',{
        method :'GET',
    })
    console.log('pressed')
})































/*let RESPONSE = await fetch("/refresh", {
    method: "POST"
});

let DATA = await RESPONSE.json();

console.log(DATA);*/