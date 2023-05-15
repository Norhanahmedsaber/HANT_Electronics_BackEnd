

const express = require('express')
const Component = require("../Models/Component")
const router = new express.Router()


router.get("/component/cat/:catId", async(req,res) => {
    const catId = req.params.catId
    const components = await Component.getByCatId(catId)
    res.send(components)
})
router.post("/component", async(req,res)=>{
    const component=req.body
    await Component.create(component)
    res.send("Created");
})
router.get("/component/:id", async(req,res)=>{
    const id= req.params.id
    const component = await Component.getByID(id)
    res.send(component);
})
router.get("/component", async(req,res)=>{
    res.send(await Component.getAll());
})
router.delete("/component/:id", async(req,res)=>{
    const id= req.params.id
    await Component.deleteById(id)
    res.send("Deleted");
})

module.exports = router