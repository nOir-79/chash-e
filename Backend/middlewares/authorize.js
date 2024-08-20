const jwt = require('jsonwebtoken')

exports.authenticateJWT = async(req,res,next) =>{
        const token = req.header('Authorization')?.replace('Bearer ','')

        if(!token)
        {
            return res.status(401).send('Access Denied')
        }

        try{
            const decoded = jwt.verify(token,process.env.SECRET_TOKEN)
            req.user = decoded
            console.log(req.user)
            next()
        }catch(error){
            console.error(error)
            res.status(500).send('Invalid Token')
        }
}



exports.roleAuthorize = (roles)=>{
    return (req,res,next)=>{
        console.log(req.user.user.role)
        if(!roles.includes(req.user.user.role))
        {
            return res.status(500).send('Not authorized')
        }
        next()

        
    }
}