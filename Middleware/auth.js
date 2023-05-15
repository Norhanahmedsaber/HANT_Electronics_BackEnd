const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const auth = async (req , res , next )=>
{
    try {
        console.log("hahah")
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        const decoded = jwt.verify(token,'HANT')
        console.log("sayed3")
        const user = await User.getById(decoded.id)
        if(!user) throw new Error()

        req.user=user
        req.token=token
        next()

    }catch(error)
    {
        console.error(error)
        res.status(401).send({error :"user not authorized"})
    }

}
module.exports = auth 