
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
        },
        emailId:{
            type:String
        },
        password:{
            type:String
        },
        age:{
            type:String
        },
        gender:{
            type:String
        }
})

module.exports=mongoose.model("User",userSchema)
