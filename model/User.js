const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trime:true,
    },
    email:{
        type:String,
        required:true,
        trime:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin", "Student", "Visitor"]
    }
});

module.exports = mongoose.model("User", userSchema);