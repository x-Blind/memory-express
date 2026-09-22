import express from 'express';
import url from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
//IMPORT MIDDLEWARES
import loggerMiddleware from './middlewares/logger.js';
import errorHandler from './middlewares/error.js';
import  jwtVerify from './middlewares/jwtVerify.js';
// IMPORT ROUTERS
import homeRouter from './routers/homeRouter.js';
import productsRouter from './routers/productsRouter.js';
import registerRouter from './routers/registerRouter.js';
import loginRouter from './routers/loginRouter.js';
import refreshRouter from './routers/refreshRouter.js';
const server = express();
const PORT = process.env.PORT; 
let __filename = url.fileURLToPath(import.meta.url) 
let __dirname = path.dirname(__filename);

// parse incoming JSON data into a JavaScript object
server.use(express.json()) 
// parse incoming HTML form data
server.use(express.urlencoded({extended:true})) 
//parse incoming cookies
server.use(cookieParser())
 // serve static files from the public folder,every request Does this URL correspond to a file in public?
server.use(express.static(path.join(__dirname,'public'),{extensions:['html']}))
// tell Express to use EJS as the view engine 
server.set('view engine', 'ejs'); 
// Hey Express, remember this information: when somebody asks you to render a view, the views are located here 
server.set('views', path.join(__dirname,'views'));
 // logger middleware
server.use(loggerMiddleware)
 // hx middleware
server.use( (req,res,next)=> {
    res.locals.isHtmx = req.headers['hx-request'] && !req.headers['hx-history-restore-request']? true:false;
    next()
 
})

server.use('/', homeRouter)
server.use('/register', registerRouter)
server.use('/login',loginRouter)
server.use('/products', productsRouter)





server.use(errorHandler)
server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});



