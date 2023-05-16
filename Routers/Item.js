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
    const listId = req.params.listId
    const itemId = req.params.itemId
    const data = req.body
    const component = await Component.getByID(itemId)
    data.name = component.name
    await Item.addItemToList(listId, itemId, data)
    res.send()
})
router.put("/item/:id", async(req,res) => {
    const itemId = req.params.id
    const data = req.body
    await Item.update(itemId, data)
    res.send("aasd")
})
router.delete("/item/:id", async(req,res) => {
    const itemId = req.params.id
    await Item.removeItemFromList(itemId)
    res.send({message:"Done"})
})
module.exports = router