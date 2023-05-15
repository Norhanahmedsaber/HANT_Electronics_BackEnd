const express = require('express')
const List = require("../Models/List")

const router = new express.Router()
router.post("/list",  async (req, res) => {
    const user = req.user
    const list = req.body
    await List.create(list, 1)
    res.send(list)
})

// router.delete("/list/:id",async (req,res)=>{
//     const id = req.params.id
//     await List.deleteById(id)
//     res.send();
// })
// router.get("/list", auth ,async(req, res) =>{
//     const user = req.user
//     const lists = await List.getUsersList(user.id)
//     res.send(lists)
// })
// router.get("/list/:id", auth, async(req,res)=> {
//     const user = req.user
//     const list = await List.getById()
//     res.send(list)
// })
module.exports = router