const express = require('express')

const router = new express.Router()

router.get("/cats", (req, res) => {
    res.send(cats)
})


module.exports = router