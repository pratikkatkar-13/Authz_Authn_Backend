const mongoose = require('mongoose');

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {console.log("DB conneced successfully")})
    .catch((err)=>{
        console.log("DB not connected");
        console.log(err);
        process.exit(1);
    });
}