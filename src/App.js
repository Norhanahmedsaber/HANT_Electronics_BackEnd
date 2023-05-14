const express = require('express')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/signin", (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    res.status(200).send("Done");
})
app.post("/signup", (req,res)=>{
    console.log(req.body)
    res.send({Data:"Done"});
})
app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})