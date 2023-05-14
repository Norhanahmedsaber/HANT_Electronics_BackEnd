const users = [{
    username: "hant",
    password: "123"
}]
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
const findUser = (username, password)=> {
    const obj = users.find((user)=>{
        return user.username === username && user.password === password
    })
    console.log(obj)
    if(obj) {
        return true;
    }
    return false;
}
app.post("/signIn", (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    if(findUser(username, password)) {
        res.status(200).send({message:"Logged In"})
    }else {
        res.status(400).send({message: "Username or Password Incorrect"})
    }

})
app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})