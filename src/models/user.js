
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maLength:50,
    },
    lastName:{
        type:String
        },
        emailId:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
          
        },
        gender:{
            type:String,
             validate(value){
            if(!["male","female","Others"].includes(value)){
                        throw new Error("gender data is not valid");
            }
           },
        },
         photoUrl:{
            type:String,
        },
        about:{
            type:String,
        },
        skills:{
            type:[String],
        },
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("User",userSchema)
