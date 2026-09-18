let home = document.getElementById('home');
let products = document.getElementById('products');
let login = document.getElementById('login');
let register = document.getElementById('register');

home.addEventListener('click', async (event)=> {
    let response = await fetch('/home',{
        method :'GET',
    })
    

})
































/*let RESPONSE = await fetch("/refresh", {
    method: "POST"
});

let DATA = await RESPONSE.json();

console.log(DATA);*/