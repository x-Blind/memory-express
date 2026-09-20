function errorHandler(err,req,res,next){
    if(err){
        console.log(err.message)
        res.send({'err':err.message})
    }
    next();
}

export default errorHandler;