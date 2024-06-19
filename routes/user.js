const express = require('express');
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const{auth, isStudent, isAdmin} = require("../middelwares/auth");


router.post("/login", login);
router.post("/signup", signup);

//protected routes
router.get("/test",auth, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected routes for TESt",
    });
})

router.get("/student",auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected routes for Students",
    });
})

router.get("/admin",auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected routes for Admin",
    });
})

module.exports = router;