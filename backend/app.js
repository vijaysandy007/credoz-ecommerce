
const express = require("express")

const app = express();

const cors = require("cors");


app.use(cors());

app.use((req,res,next)=>{

console.log("Index middle ware");

 next()

});


app.get("/",(req,res)=>{
    
    console.log("Index");

    res.send("<h1>Welcome to nodeJS</h1>")

});

app.use("/home",(req,res,next)=>{


    console.log("Home Page Middle Ware");

    next();

});

app.get("/home",(req,res)=>{

    console.log("Home Page");

    var data ={username:"vijay",age:"24"}

    res.json(data);
})


// var products =[{pdtName:"Knorr Instant Soup (100 Gm)",pdtprice:25,pdtImagpath:"./assets/images/5.png"},
// {pdtName:"Chings Noodles (75 Gm)",pdtprice:30,pdtImagpath:"./assets/images/6.png"},
// {pdtName:"Lahsun Sev (150 Gm)",pdtprice:30,pdtImagpath:"./assets/images/7.png"},
// {pdtName:"Premium Bake Rusk (300 Gm)",pdtprice:60,pdtImagpath:"http://localhost:4200/assets/images/8.png"}
// ]



module.exports = app;

