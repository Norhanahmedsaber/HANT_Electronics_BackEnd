const express = require('express')
const List = require("../Models/List")
const auth = require("../Middleware/auth")
const router = new express.Router()
router.post("/list", auth, async (req, res) => {
    const user = req.user
    const id = await List.create(user.userid)
    res.send({id: id})

})

router.delete("/list/admin/:id", async (req,res)=>{
    const user = req.user;
    const id = req.params.id
    await List.deleteByIdAdmin(id)
    res.send();
})
router.delete("/list/user/:id", auth, async (req,res)=>{
    const user = req.user;
    const id = req.params.id
    await List.deleteByIdUser(id, user.userid)
    res.send({message: "deleted"});
})
router.get("/list", auth ,async(req, res) =>{
    const user = req.user
    const lists = await List.getUsersList(user.userid)
    res.send(lists)
})
router.get("/list/search/:search", auth, async(req,res) => {
    const user = req.user
    const search = req.params.search
    const lists = await List.search(user.userid, search)
    res.send(lists)
})
router.get("/list/:id", auth, async(req,res)=> {
    const user = req.user
    const id = req.params.id
    const list = await List.getById(id, user.userid)
    res.send(list)
})
router.put("/list/:id", async(req,res) => {
    const id = req.params.id
    const data = req.body
    await List.update(id, data)
    res.send()
})
router.put("/list/setfav/:id", auth, async(req, res)=>{
    const id = req.params.id
    const user = req.user
    const lists = await List.toggleFav(id, user.userid)
    res.send({message:"toggled fav"});
})
router.get("/list/get/favs", auth, async(req, res)=>{
    const user = req.user
    const lists = await List.getFavs(user.userid)
    res.send(lists)
})
module.exports = router