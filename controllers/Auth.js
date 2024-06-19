const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup routs
exports.signup = async (req,res)=>{
    try{
        //fetching all the data
        const{name, email, password, role} = req.body;
        //check is user already exist
        const existinguser = await User.findOne({email});
        if(existinguser)
            {
                return res.status(400).json({
                    success:false,
                    message:"user already exist",
                })
            }

        //securing password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:"error in hasing",
            })
        }
        //create user
        const user = await User.create({
            name,email, password:hashedPassword,role
        });

        return res.status(200).json({
            success:true,
            message:"user created successfully",
        });

    }
    catch(error){
        console.err(error);
        return res.status(500).json({
            success:false,
            message:"not creted user !! plz try again",
        });

    }
}
 

//login controller
exports.login = async (req,res)=>{
    try{

        //data fetch
        const{email,password} = req.body;
        //validation on email and password
        if(!email || !password)
            {
                return res.status(400).json({
                    success:false,
                    message:"Entry not Valid",
                });
            }
    

    //check for registered user
    let user = await User.findOne({email});
    if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }


    const payload = {
        email:user.email,
        id:user._id,
        role:user.role,
    };
    //verify password and generate a JWT token
    if(await bcrypt.compare(password,user.password))
        {
            //password match
            let token = jwt.sign(payload,process.env.JWT_SECERT,{
                expiresIn:"2h",
            });

            //m1
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            //m2
            //const oldUser = {..user, token};
            //oldUser.password = undefined;

            //m3f
            // user.token = token;
            // user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
    else{
        //password do not match
        return res.status(403).json({
            succes:false,
            message:"Password Incorrect",
        });
    }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Login Failure'
        });

    }
}
