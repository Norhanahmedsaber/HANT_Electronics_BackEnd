
let users = []
let items=[{id:1,name:'IC',description:'IC3400'}]
const express = require('express')
const userRouter = require('./Routers/User')
const listRouter = require('./Routers/List')
const itemRouter = require('./Routers/Component')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(listRouter)
app.use(itemRouter)


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


})


app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})