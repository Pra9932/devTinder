
const express=require('express');

const authRouter=express.Router();

const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

authRouter.post("/signup",async(req,res)=>{


    // console.log(req.body);
    

    try{
        //validation of data is required
        validateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        //encrypt password
        const passwordHash=await bcrypt.hash(password,10);
        
        console.log(passwordHash);
        
          //creating a new user of user model
        const user=new User( {
            firstName,
            lastName,
            emailId,
            password:passwordHash,
     } );
      
        await user.save();
        res.send("User added Successfully");
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
    
    //creating new instance of User model
    //const user=new User(userObj);

           
            //creating a new instance of the user model
            //  const user=new User({
            //     firstName:"MS",
            //     lastName:"Dhoni",
            //     emailId:"msDhoni@kohli.com",
            //     password:"Dhoni@1234"

            // });

            // try{
            //     await user.save();
            //     res.send("user added successfully");
            // }catch(err){
            //     res.status(400).send("Error the user"+err.message);
            // }
            




});

authRouter.post("/login",async(req,res)=>{


    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            // throw new Error("Email Id is not present in DB:");
             throw new Error("Invalid credentials Email!!!");
        }
        const  isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){

            //create a jwt token

           const token=await user.getJwt();

             // add the token to cookie and send the response back to the user
             res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000),
             });

            res.send("login sucessfully!!!");
        }else{
            // throw new Error("id not valid!!");
             throw new Error("Invalid credentials p!!!");
        }
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}

});


module.exports=authRouter;
