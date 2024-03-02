//importing packages
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

//server configs
const app = express()
const PORT = 3000 || process.env.PORT

//connecting db
connectDB()

//middleware
app.use(express.json())

//routes middleware
app.use('/api', require('./routes/auth'))

//running server
app.listen(PORT,()=>{console.log(`Server Running http://localhost/${PORT}`)})