const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        min : 4 , max : 10,
        require : true
    },
    password:{
        type: String,
        min : 4 , max : 10,
        require : true
    },
    email:{
        type: String,
        require : true
    }
})
module.exports = new mongoose.model('User',UserSchema )