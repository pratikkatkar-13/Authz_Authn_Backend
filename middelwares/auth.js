///auth, is Student, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) =>{
    try{
        //extract jwt token
        //M1 || req.cokies.token; - need cookie parser
        //M2 ||req.body.token; - need body paser
        //M3 ||req.header("Authourization").replace("Bearer",""); - (secured way) Authorization: Bearer <token>
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not availabe",
            })
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECERT);
            console.log(payload);
            req.user = payload; // here user is an filed with paylod created
            // req ={
            //     token :"-----",
            //     user : payload // that constins email. role and user_is

            // }
        }
        catch(err)
        {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying the user token",
        });
    }
}



exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is s protected rout for students",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });
    }
}



exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is s protected rout for students",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });
    }
}