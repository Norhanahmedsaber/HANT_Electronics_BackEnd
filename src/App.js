
const express = require('express')
const userRouter = require('./Routers/User')
const listRouter = require('./Routers/List')
const itemRouter = require('./Routers/Component')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(listRouter)
app.use(itemRouter)


app.listen(port, () => {
    console.log('Server is Running on port: ' + port)
})