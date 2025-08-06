
const express=require("express");

   const connectDB=require("./config/database");

const app=express();
const cookieParser=require("cookie-parser");

const authRouter=require("./routes/authes");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requestRouter");

app.use(cookieParser());

app.use(express.json());

app.use("/",authRouter)
app.use("/",profileRouter);
app.use("/",requestRouter);

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
