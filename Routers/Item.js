const express = require('express')
const Item = require("../Models/Item")
const Component = require("../Models/Component")
const auth = require("../Middleware/auth")
const router = new express.Router()

router.get("/item/:listId",async(req, res) => {
    const listId = req.params.listId
    const items = await Item.getByListId(listId)
    res.send(items);
})
router.post("/item/add/:listId/:itemId",async (req,res) => {
    const listId=req.params.listId
    const itemId=req.params.itemId
    const component=await Component.getByID(itemId)
    await Item.addItemToList(listId, itemId, component.name)
 
    res.send({
        message: "Added Successfully"
    })
})
router.put("/item/:id", async(req,res) => {
    const itemId = req.params.id
    const data = req.body
    await Item.update(itemId, data)
    res.send({message:"updated"})
})
router.delete("/item/:id", async(req,res) => {
    const itemId = req.params.id
    await Item.removeItemFromList(itemId)
    res.send({message:"Done"})
})
module.exports = router