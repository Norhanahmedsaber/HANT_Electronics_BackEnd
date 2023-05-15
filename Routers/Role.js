
const express = require('express')
const Role = require("../Models/Role")
const router = new express.Router()

router.post("/roles",async(req , res)=>{
    const role ={
        name:req.body.name
    }
    await Role.create(role)
    res.send("Created")
})

router.get("/roles",async(req,res)=>{
    const roles = await Role.getAll()
    res.send(roles)
})

router.get("/roles/:id",async(req,res)=>{
    const id = req.params.id;
   const role =  await Role.getAByID(id)
    res.send(role)

})

router.delete("/rolesDelete/:id" , async(req,res)=>{
    const id= req.params.id;
    await Role.deletee(id)
    res.send("Deleted")
})
module.exports = router