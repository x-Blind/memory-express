function loggerMiddleware(req,res,next){
    console.log(req.method);
    console.log(req.url);
    //console.log("req.body INSIDE LOGGER",req.body)
    next();
}

export default loggerMiddleware;