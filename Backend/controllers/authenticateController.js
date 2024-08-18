const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req,res)=>{
    try{
        const {username,password} = req.body
        if(!username)
        {
            console.log('Username needed')
            return res.status(401).send('Username needed')
        }
        if(!password){
            console.log('Password needed')
            return res.status(401).send('Password needed')
        }

        const checkForUser = await User.findOne({username:username})

        if(checkForUser){
            console.log('User already registered')
            return res.status(402).send('User already registered')
        }

        const user = new User({
            username: username,
            password:password
        })

        await user.save()
        return res.status(200).send('User registered!')
    }catch(error)
    {
        console.error(error)
        return res.status(500).send('Error registering user')
    }
}


exports.login = async(req,res) =>{
    const {username,password} = req.body

    const user = await User.findOne({username:username})

    if(!user)
    {
        console.log('User not found with that username')
        return res.status(403).send('User not found with that username')
    }

    if(!await bcrypt.compare(password,user.password))
    {
        console.log('Wrong password')
        return res.status(404).send('Wrong password')
    }

    const token = jwt.sign({user:user},process.env.SECRET_TOKEN)

    return res.status(200).send({token})


}