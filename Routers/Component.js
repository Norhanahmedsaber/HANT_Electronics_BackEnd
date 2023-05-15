let components=[{id:1,name:'IC',description:'IC3400'}]
const express = require('express')

const router = new express.Router()

router.get("/cats", (req, res) => {
    res.send(cats)
})
app.get("/components/:id" , (req,res) =>{
    const id =req.params.id;
     const obj = components.find((item)=>{
         return item.id==id;
     })
     if(obj){
         res.status(200).send(obj); 
     }else{
         res.status(400).send() 
     }
    
 })

module.exports = router