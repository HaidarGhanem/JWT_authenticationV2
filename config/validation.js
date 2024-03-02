const Joi = require('@hapi/joi')

//register validation function
const registerValidation = (data)=>{
    const schema = Joi.object({
        username: Joi.string().min(4).max(8).required(),
        password: Joi.string().min(4).max(8).required(),
        email: Joi.string().required().email()
    })
     schema.validate(data)  
}

//login validation function
const loginValidation = (data)=>{
    const schema = Joi.object({
        password: Joi.string().min(4).max(8).required(),
        email: Joi.string().required().email()
    })
     schema.validate(data) 
       
}

exports.registerValidation = registerValidation
exports.loginValidation = loginValidation

