const express = require('express')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/signIn", (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password)
    res.status(200).send();
})

app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})