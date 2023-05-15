let users = []
const getListFromDatabase = ()=> {
    return [{
        id: 1,
        name: "list 1"
    }]
}
const express = require('express')
const userRouter = require('./Routers/User')
const listRouter = require('./Routers/List')
const itemRouter = require('./Routers/Component')
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
app.get("/lists",(req,res)=>{
    const lists =  getListFromDatabase();
    res.send(lists);
})

app.get("/users", (req,res)=>{
    res.status(200).send(
        users
    );
})


app.post("/signup", (req,res)=>{
    const user={
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    }
    users = users.concat(user);
    res.send({Data:"Done"});
app.use(userRouter)
app.use(listRouter)
app.use(itemRouter)



app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})