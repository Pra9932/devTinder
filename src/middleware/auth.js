const jwt=require('jsonwebtoken');
const User=require("../models/user");

const userAuth= async (req,res,next)=>{

    //Read the token req cookies

   try{ 
    const{token}=req.cookies;
    if(!token){
        throw new Error("Token is not valid!!!");
    }
    //Validate the token
     const decodeObj=await jwt.verify(token,"Dev@Tinder$790");
    //Find the user
    
    const{_id}=decodeObj;
    const user=await User.findById(_id);
    if(!user){
        
        throw new Error("user not found");
    }
    req.user=user;
    next();}
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }

};

module.exports={
    userAuth
};
