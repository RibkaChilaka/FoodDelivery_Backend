const express=require('express')
const app=express()
const port=process.env.PORT || 5000
const mongoDB=require('./db')
const cors = require("cors");
app.use(cors());
require('dotenv').config();

mongoDB()

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData.js'))
app.use('/api',require('./Routes/OrderData.js'))

app.get("/", (req,res)=>{
    res.send("Hello world----")
})

app.listen(port, ()=>{
    console.log(`server listeting on port ${port}`)
})
