const express = require("express");

const loging = express();

const bodyparse = require("body-parser");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const mondodb = require("mongodb").MongoClient;

const multer = require("multer");

loging.use(cors());

var db;

 mondodb.connect("mongodb+srv://vijaysandy:Vijaysa@cluster0.ekrj8.mongodb.net/ecommerce?retryWrites=true&w=majority",(error,result)=>{

 if(error){

    console.log("error");
 }

 else{

    db = result.db("ecommerce");

    console.log("DB connected")
 }

 });


loging.use(bodyparse.json());


loging.post("/register",(req,res)=>{


    req.body._id = new Date().getTime();

    db.collection("users").save(req.body,(error,data)=>{
   
        if(error){

            res.status(403).json("Error in Insert Method") 
         }
    
         else{
   
             res.json("User Register Succesfully");
         }
      
    });
  
});

loging.post("/login",(req,res)=>{

    db.collection("users").find(req.body,{projection:{_id:1, Username:1}}).toArray((error,data)=>{

        if(error){
            res.status(403).json("Error in finding");
        }
        else{
           var token ="";

           if(data.length>0){

            token = jwt.sign(data[0],"securityKey");

           }

           res.json(token);
        }

    });

});


// ----------------------------Admin Login ---------------------------------------------

loging.post("/addproducts",(req,res)=>{

    db.collection("admin").find(req.body,{projection:{_id:1, UserName:1}}).toArray((error,data)=>{

        if(error){
            res.status(403).json("Error in finding");
        }
        else{
           var token ="";

           if(data.length>0){

            token = jwt.sign(data[0],"securityKey");

           }

           res.json(token);
        }

    });

});


loging.get("/getCategories",(req,res)=>{

    db.collection("category").find().toArray((error,data)=>{
        res.json(data);
    })
})



loging.get("/getpdtcatwise/:catid",(req,res)=>{
 

    db.collection("products").find({pdtCatId: Number(req.params.catid)}).toArray((error,data)=>{
        res.json(data);
    });
});
 
loging.get("/proddetial/:prodid",(req,res)=>{

    var result = [];

    db.collection("products").find({_id : Number(req.params.prodid)}).toArray((error,data)=>{

        result.push(data);

        db.collection("products").find({pdtCatId : Number(data[0].pdtCatId)}).toArray((error1,data1)=>{

            console.log(data1)
            result.push(data1)
    
        });

         res.json(result);
        
    });

    
})



loging.get("/registers",(req,res)=>{

    db.collection("users").find(req.body,{projection:{_id:1, Username:1}}).toArray((error,data)=>{

        if(error){
            res.status(403).json("Cannot find Username");
        }

        else{
            res.json(data);
        }

    })

})


loging.get("/login",(req,res)=>{

    res.send("<h1>Succesfully Running port 4700 for Login</h1>")
});

var loggedUser;

function verifyToken(req,res,next){

    var token = req.headers.myauthtoken

    if(!token){

       return res.status(401).json("No Token Found")
    }

    jwt.verify(token,"securityKey", (error,data)=>{

        if(error){

            return res.status(401).json("Token Inavild");
        }
          
        loggedUser = data
    })

    next();
}

loging.post("/myCart", verifyToken, (req,res)=>{

   
    req.body._id = new Date().getTime();

    req.body.cartUserId = loggedUser._id;

    req.body.cartPdtQty = 1;

    console.log(req.body)

    db.collection("cart").insert(req.body, (error,data)=>{

        res.json("Cart Item Added Succefully")
    })
    
});



loging.get("/myCartCount", verifyToken, (req, res)=>{


    db.collection("cart").count({cartUserId: loggedUser._id},(error, data)=>{

        res.json(data);
    })

});

loging.get("/myCart", verifyToken, (req, res)=>{


    db.collection("cart").aggregate([
 
 
     {$match: {cartUserId: loggedUser._id}},
 
     {$lookup:{
 
         from: "products",
         localField:"cartPdtId",
         foreignField: "_id",
         as: "productdetials"
     }}
      
     
    ]).toArray((error,data)=>{
 
        res.json(data);
 
    })
        
     
 
 });


 loging.put("/updatecart", verifyToken, (req,res)=>{

    var condition = {_id: req.body.cartId };
    
    var newValues ={$set: {cartPdtQty: req.body.cartPdtQty, cartpdtPrice: req.body.cartPdtQty*req.body.pdtPrice}};

    db.collection("cart").update(condition, newValues, (error, data)=>{

        res.json("Cart Items Updated Successfully")
    });
 });


 loging.put("/minuscart", verifyToken, (req,res)=>{

    var condition = {_id: req.body.cartId };
    
    var newValues ={$set: {cartPdtQty: req.body.cartPdtQty, cartpdtPrice: req.body.cartPdtQty - req.body.pdtPrice}}

    db.collection("cart").update(condition, newValues, (error, data)=>{

        res.json("Cart Items Minus Successfully")
    });
 });


 loging.delete("/removecart/:cartid", verifyToken, (req,res)=>{

    db.collection("cart").deleteOne({_id: Number(req.params.cartid)}, (error, data)=>{

        res.json("Cart item Removed Successfully");
    })
 })


 

const myStorage = multer.diskStorage({
    destination: (req, file, cb)=>{

        cb(null, "src/assets/productImages")
    },

    filename: (req, file, cb)=>{

        cb(null, file.originalname+"-"+new Date().getTime()+".png")
    }
})

loging.post("/addproductses",verifyToken, multer({storage: myStorage }).single("pdtImage"), (req,res)=>{

    req.body.pdtCatId = Number(req.body.pdtCatId)
    req.body.pdtPrice = Number(req.body.pdtPrice)

    req.body._id = new Date().getTime();

    req.body.pdtImgPath ="assets/productImages/"+ req.file.filename;

    console.log(req.body);

    db.collection("products").save(req.body,(error, data)=>{

        res.json("Product created");

    });

});


loging.get("/addproducts",(req,res)=>{

    //res.json(products);

    db.collection("products").find().toArray((error,data)=>{

        res.json(data)
    })
    
    });

    loging.get("/orders", (req,res)=>{

       
        db.collection("cart").count((error,data)=>{

            res.json(data)
        })
    
    })

    loging.get("/customer",  (req,res)=>{

       
        db.collection("users").count((error,data)=>{

            res.json(data)

            
        })
    
    })


module.exports = loging;