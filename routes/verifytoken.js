const jwt = require('jsonwebtoken')

//auth fun that used to verify the access of private routes
function auth (req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('access denied')
    try{   
        req.user = verified
    }
    catch(e){
        res.status(404)
        console.log(e)
    }
    next()
}