
const express=require('express');
const userRouter=express.Router();

const {userAuth}  = require('../middleware/auth');
const connectionRequest=require("../models/connectionRequest");

const user_safe_data="firstName lastName photoUrl age gender about skills "


//get all the pending connection for loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
            const loggedInUser=req.user;
            const connectionRequests=await connectionRequest.find({
                toUserId:loggedInUser._id,
                status:"interested",

            }).populate("fromUserId",["firstName","lastName"]);

            res.json({message:"data fetched successfully",
                data:connectionRequests,
            });
}catch(err){
    req.statusCode(400).send("ERROR:"+err.message);
}

});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        
        const loggedInUser=req.user;
        const connectionRequests=connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},

            ],
        }).populate("fromUserId",user_safe_data)
         .populate("toUserId",user_safe_data);
         const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===logInUserId._id.toString()){
                return row.toUserId;
            }
        });
            return row.toUserId;

        res.json({data});

    }catch(err){
        res.status(400).send({message:err.message});
    }
});

module.exports=userRouter;