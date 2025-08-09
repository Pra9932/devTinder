
const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",//reference to the user collection
            required:true,
        },
         toUserId:{
            type:mongoose.Schema.Types.ObjectId,
             ref:"User",//reference to the user collection
            required:true,
        },
        status:{
            type:String,
            enum:{
                values:["ignored","interested","accepted","rejected"],
                message:`{VALUE} is incorrect status type`
            }
        },

},
{ timestamps:true}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});


connectionRequestSchema.pre("save", function(next) {

   const connectionRequest=this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("can not send connection to yourself");
    }
    next();
});


const ConnectionRequestModel=new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);


module.exports=ConnectionRequestModel;

