//importing packages
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { registerValidation , loginValidation } = require('../config/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//starting register route
router.post('/register', async (req,res)=>{
    try{

        //fetching fata
        const data = req.body
        
        //checking validation of them
        const error = registerValidation(data)
        if(error) return res.status(400).send(error.details[0].message)

        //checking exsitence of the email
        const email = req.body.email
        const existEmail = await User.findOne({email})
        if(existEmail) return res.status(400).send("email already in use")

        //encrypting the password
        const salt = await bcrypt.genSalt(5)
        const hashedpass = await bcrypt.hash(req.body.password , salt)

        //creating user
        const newUser = await User.create({email: req.body.email , username: req.body.username , password : hashedpass})
        res.json(newUser)
    }
    catch(e){
        res.status(404)
        console.log(e)
    }

})

router.post('/login', async (req,res)=>{
    try{

        //fetching data
        const data = req.body

        //checking validation of them
        const error = loginValidation(data)
        if(error) return res.status(400).send(error.details[0].message)

        //verifying the email
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send("invalid email try again")

        //verifing the password comparing with the hashed one
        const passValidation = await bcrypt.compare(req.body.password , user.password)
        if(!passValidation) return res.status(400).send("invalid password try again")

        //init the token
        const token = jwt.sign({_id: user._id} , process.env.tokenSecret)
        res.header('auth-token',token).send(token)
    }
    catch(e){
        res.status(404)
        console.log(e)
    }
})


module.exports = router
