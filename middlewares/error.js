function errorHandler(err,req,res,next){
    if(err){
        console.log("errrrrrrrrrrrorrrrrrrrrrr")
        res.send({'err':err.message})
    }
    next();
}

export default errorHandler;