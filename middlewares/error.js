function errorHandler(err,req,res,next){
    if(err){
        console.log("heyyyyyyy")
        res.send({'err':err.message})
    }
    next();
}

export default errorHandler;