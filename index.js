const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middeware
app.use(express.json());
const cookieParse = require("cookie-parser");
app.use(cookieParse);

//require parser

//DB connection called
require("./config/database").connect();

//routes
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, ()=>{
    console.log("app is started");
})

app.get('/',(req,res)=>{
    res.send("<h1>Page working</h1>");
})

