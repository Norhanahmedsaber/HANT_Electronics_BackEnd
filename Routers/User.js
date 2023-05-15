let users = []
const express = require('express')

const router = new express.Router()

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

router.post("/signin", (req,res)=>{

    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    if(findUser(username, password)) {
        res.status(200).send({message:"Logged In"})
    }else {
        res.status(400).send({message: "Username or Password Incorrect"})
    }

})
router.post("/signup", (req,res)=>{
    const user={
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    }
    users = users.concat(user);
    res.send({Data:"Done"});


})
router.get("/users", (req,res)=>{
    res.status(200).send(
        users
    );
})


module.exports = router