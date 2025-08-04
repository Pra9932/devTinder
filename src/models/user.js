const mongoose=require('mongoose');
        
    const validator=require("validator");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
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
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Adress:"+value);
                }
            },
        },
        password:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Invalid Password:"+value);
                }
            },
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
            default:"https://www.google.com/search?sca_esv=41771b6d1dd3ed98&sxsrf=AE3TifPChCfB75FFPtbApKneuhCn7YRuuw:1754246304096&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeiAkWG4OlBE2zyCTMjPbGmPgfe_7ak8LUsonpWCvT6w6csnyTymMQ2XHqFKxVhyiTsB7_xjE7pCrlhvgmABFb-qvUXFeXLKmP5HUMuOwzi3W7YDpORc67v9mLSkQHRt4AKqGi9dyO-keM7IQ79ZYnZFqT5u-Q65xNOQ8PY-9XmwIuX2eAQ&q=image&sa=X&ved=2ahUKEwiFqrfepO-OAxWQSmwGHXURHB0QtKgLegQIExAB&biw=1268&bih=549&dpr=1.5#vhid=s_UYcOUl07ucGM&vssid=mosaic",
             validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid photho Url:"+value);
                }
            },
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
