let users = []
const express = require('express')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/signIn", (req,res)=>{
    console.log(req.body);
    res.status(200).send({
        message:"ali"
    });
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

})
app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})