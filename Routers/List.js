let lists = []
const express = require('express')

const router = new express.Router()


router.get("/lists",(req,res)=>{
    res.send(lists);
})

module.exports = router