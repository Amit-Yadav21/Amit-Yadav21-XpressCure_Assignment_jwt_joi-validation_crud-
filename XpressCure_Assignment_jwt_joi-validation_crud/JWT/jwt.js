const jwt =require('jsonwebtoken');

const veryfitoken = (req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split("=")[1]
        jwt.verify(token, "amit",(err,id)=>{
            if(err){
                console.log('token expire.......');
            }
            else{
                req.id = id
                console.log(req.id); // id on terminal 
                next()
            }
        })
    }
    else(
        next()
    )
}

module.exports = {veryfitoken}