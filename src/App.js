let users = []
let items=[{id:1,name:'IC',description:'IC3400'}]
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
app.get("/items/:id" , (req,res) =>{
   const id =req.params.id;
   console.log(id)
    const obj = items.find((item)=>{
        return item.id==id;
    })
    console.log(obj)
    if(obj){
        res.status(200).send(obj); 
    }else{
        res.status(400).send() 
    }
   
})

app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})