const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const auth = async (req , res , next )=>
{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,'HANT')
        const user = await User.getById(decoded.id)
        if(!user) throw new Error()

        req.user=user
        req.token=token
        next()

    }catch(error)
    {
        
        res.status(401).send({error :"user not authorized"})
    }

}
module.exports = auth 