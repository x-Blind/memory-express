import jwt from 'jsonwebtoken';
//LOGIN USING TOKEN
function jwtVerify(req,res,next){
    let authHeader = req.headers['authorization']//authorization
    if(!authHeader) return sendStatus(401);
    let access_Token = authHeader.split(' ')[1]
    jwt.verify(access_Token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) res.sendStatus(401);//Invalid token
            req.user = decoded.email;
            next()
        }
    )
}

export default jwtVerify;
//{"email":"xblind1995@gmail.com", "password":"1234"}