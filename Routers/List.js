const express = require('express')
const List = require("../Models/List")
const auth = require("../Middleware/auth")
const router = new express.Router()


router.post("/circuit", auth, async (req, res) => {
    const user = req.user
    if(user.roleid !== 2) {
        return res.status(401).send("Unauthorized")
    }
    const data = req.body
    await List.createCircuit(user.userid,data)
    res.send({
        message: "created"
    })
})
router.delete("/circuit/:id", async (req,res)=>{
    const id = req.params.id
    await List.deleteCircuit(id)
    res.send({message: "deleted"});
})
router.put("/circuit/:id", async(req,res) => {
    const id = req.params.id
    const data = req.body
    await List.updateCircuit(id, data)
    res.send(
        {
            message: "updated"
        }
    )
})
router.get("/circuit" ,async(req, res) =>{
    const lists = await List.getAllCircuits()
    res.send(lists)
})
router.get("/circuit/:id", auth ,async(req, res) =>{
    const id = req.params.id
    const result = await List.getById(id)
    res.send(result)
})
router.get("/circuit/search/:search", auth ,async(req, res) =>{
    const search = req.params.search
    const lists = await List.searchCircuits(search)
    res.send(lists)
})

// Lists
router.post("/list", auth, async (req, res) => {
    const user = req.user
    const id = await List.create(user.userid)
    res.send({
        id
    })
})
router.delete("/list/:id", async (req,res)=>{
    const id = req.params.id
    await List.deleteById(id)
    res.send({message: "deleted"});
})
router.put("/list/:id", async(req,res) => {
    const id = req.params.id
    const data = req.body
    await List.update(id, data)
    res.send(
        {
            message: "updated"
        }
    )
})
router.get("/list", auth ,async(req, res) =>{
    const user = req.user
    const lists = await List.getuserLists(user.userid)
    res.send(lists)
})
router.get("/list/search/:search", auth ,async(req, res) =>{
    const user = req.user
    const search = req.params.search
    const lists = await List.search(user.userid, search)
    res.send(lists)
})

router.put("/list/fav/:id", auth, async(req, res)=>{
    const id = req.params.id
    const fav = await List.toggleFav(id)
    if(fav === "Y") {
        res.send({
            message:"Added to Favourites"
        });
    }else {
        res.send({
            message:"Removed From Favourites"
        });
    }

})
router.get("/list/fav", auth, async(req, res)=>{
    const user = req.user
    const lists = await List.getFavs(user.userid)
    res.send(lists)
})
router.post("/list/copy/:id", auth, async(req, res) => {
    const user = req.user
    const id = req.params.id
    await List.copy(user.userid, id)
    res.send({
        message: "Copied"
    })
})
module.exports = router