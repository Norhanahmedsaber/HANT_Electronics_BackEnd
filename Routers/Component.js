const express = require('express')

const router = new express.Router()

router.get("/cats", (req, res) => {
    res.send(cats)
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

module.exports = router