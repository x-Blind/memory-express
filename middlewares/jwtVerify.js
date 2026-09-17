import jwt from 'jsonwebtoken';
//LOGIN USING TOKEN
function jwtVerify(req,res,next){
    console.log("here three")
    let authHeader = req.headers['authorization']//authorization
    if(!authHeader) return sendStatus(401);
    let access_Token = authHeader.split(' ')[1]
    console.log("here's full header", authHeader)
    console.log("here's the token", access_Token)
    jwt.verify(access_Token,
        process.env.ACESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403);//Invalid token
            req.user = decoded.email;
            next()
        }
    )
}

export default jwtVerify;