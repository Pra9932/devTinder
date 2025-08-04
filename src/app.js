
const express=require("express");

   const connectDB=require("./config/database");

const app=express();

const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());

app.post("/signup",async(req,res)=>{


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

app.post("/login",async(req,res)=>{


    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            // throw new Error("Email Id is not present in DB:");
             throw new Error("Invalid credentials!!!");
        }
        const  isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("login sucessfully!!!");
        }else{
            // throw new Error("id not valid!!");
             throw new Error("Invalid credentials!!!");
        }
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}

});


//Get user by email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    
    try{
        const user=await  User.find({emailId:userEmail});
        res.send(user);
    }catch(err){
        res.status(400).send("Something Went Wrong:");
    }
   

})

app.get("/feed",async (req,res)=>{
    
    try{
        const users=await  User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something Went Wrong:");
    }
});

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
     const data=req.body;
     
    try{
        const ALLOWED_UPDATE=["userId","photoUrl","gender","about","age","skills"];

    const isUpdateAllowed=Object.keys(data).every((k)=>
         ALLOWED_UPDATES.includes(k)
);
if(!isUpdateAllowed){
      throw new Error("Update not allowed");
}

        if(data?.skills.length>10){
            throw new Error("Skills can not be more Than 10");
        }
   
    
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"After",
            runValidators:true,
        });

        console.log(user);
        res.send("User updated successfully");

    }catch(err){
        res.status(400).send("something went wrong!!!!!",+err.message);
    }
});

connectDB().then(()=>{
    console.log("database Connection successfully....");
    app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777:..");
});

}).catch(err=>{
        console.error("database Can not be connected....");
});
//This will handle GET call to \user

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Prahallad",lastName:"Das"});
// });

// // app.use("/hello",(req,res)=>{
// //     res.send("Hello hello hello !!!");
// // });

// // app.use("/",(req,res)=>{
// //     res.send("Hello from the dashboard");
// // });


// app.use("/test",(req,res)=>{
//     res.send("Hello from the server!");
// });
