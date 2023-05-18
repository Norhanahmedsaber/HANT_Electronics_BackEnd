const express = require("express");
const userRouter = require("../Routers/User");
const listRouter = require("../Routers/List");
const componentRouter = require("../Routers/Component");
const phonesRouters = require("../Routers/Phones");
const storesRouter = require("../Routers/Store");
const roleRouter = require("../Routers/Role")
const categoryRouter = require("../Routers/categories")
const itemRouter = require("../Routers/Item")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(userRouter);
app.use(listRouter);
app.use(componentRouter);
app.use(phonesRouters);
app.use(storesRouter);
app.use(categoryRouter)
app.use(roleRouter)
app.use(itemRouter)


app.post("/scrap",async(req,res)=>{
  const search = req.body.search
  data = await scrap(search)
  res.send(data)
})
const scrap = async (search)=> {
  
  const response = await fetch("http://localhost:8080/searchdata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      component:search
    }),
  })
  const result = await response.json()
  return result
}
app.listen(port, () => {
  console.log("Server is Running on port: " + port);
});
