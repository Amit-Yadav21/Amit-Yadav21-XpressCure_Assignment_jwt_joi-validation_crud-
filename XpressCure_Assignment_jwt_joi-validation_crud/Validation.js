const Joi = require('joi');

const signup_Validation = (req, res, next)=>{
    const schema =Joi.object().keys({
        Name : Joi.string().required(),
        Email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','org','edu'] } }),
        // Address : Joi.string().required(),
        Address : Joi.array().items().required(),
        // Phone_Number : Joi.number().min(1000000000).max(9999999999).required()
        Phone_Number : Joi.number().min(10).max(13).pattern(/^[0-9]+$/)
        .messages({'string.pattern.base':'Invalid phone number regex.','string.min':'Phone Number minimum 10 digit','string.max':'Phone Number Maximum 133 digit 13 digit'})
        .required()
    })
    const {error} = schema.validate(req.body,{ abortEarly :false});
    if(error){
        res.status(200).json({error:error})
    }else{
        next()
    }
} 

const login_Validation = (req, res, next)=>{
    const schema =Joi.object().keys({
        Name : Joi.string().required(),
        Email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','org','edu'] } }),
    })
    const {error} = schema.validate(req.body,{ abortEarly :false});
    if(error){
        res.status(200).json({error:error})
    }else{
        next()
    }
} 

module.exports = {signup_Validation,login_Validation}