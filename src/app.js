
const express=require("express");

   const connectDB=require("./config/database");

const app=express();

const User=require("./models/user");

app.post("/signup",async(req,res)=>{

    const user=new User({
        firstName:"Prahallad",
        lastName:"Das",
        emailId:"dasprahallad2021@gmail.com",
        password:"das@1234",
    });

    try{
        await user.save();
        res.send("User added Successfully");
}catch(err){
    res.status(400).send("Error saving the User:",err.message);
}
    
    //creating new instance of User model
    // const user=new User(userObj);
})



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
