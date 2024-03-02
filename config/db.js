const mongoose = require('mongoose')

//connecting to the mongo db
const connectDB = async ()=>{
    try{
        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(process.env.MongoURI)
        console.log(`Mongo Connected ${conn.connection.host}`)
    }
    catch(e){
        console.log(e)
    }
}

module.exports = connectDB