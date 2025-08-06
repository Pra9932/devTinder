
const express=require('express');
const requestRouter=express.Router();
const {userAuth} =require("../middleware/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    
    const user=req.User;
       console.log("Sending the connection Request");
       res.send(User.firstName+"+Send the connection request");

});
module.exports=requestRouter;
