
const express = require('express')
const userRouter = require('../Routers/User')
const listRouter = require('../Routers/List')
const componentRouter = require('../Routers/Component')
const categoryRouter=require('../Routers/categories')
const roleRouter = require('../Routers/Role')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())



app.use(userRouter)
app.use(listRouter)
app.use(componentRouter)
app.use(categoryRouter)
app.use(roleRouter)


app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})