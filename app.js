const express = require('express');
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs")
const users = require("./Schema/userlogin/user")
const inventory = require("./Schema/inventorySchema/inventory")
const order = require("./Schema/orderSchema/order")
const all = [];
var customer = [];
app.set("view engine","ejs")
app.use(express.json())
app.listen(3002,(err)=>{
    if(!err)
    {
        console.log("server strated");
    }
    else{
        console.log("server not strated");
    }
})
mongoose.connect("mongodb://localhost/api-web-tech-assignment",()=>{
     console.log("db connected")
},(err)=>{
    console.log(err)
})
//adding users with unique email
app.post("/login",(req,res)=>{
    users.find({email:req.body.email}).then((userdata)=>{
        if(userdata.length)
        {
            res.send("try with different email");
        }
        else
        {
            users.create({name:req.body.name , email: req.body.email}).then((data)=>{
                customer.push(data)
                res.send("user logged in")
            }).catch((err)=>{
                res.send(err)
            })
        }
    })
})

app.post("/additems",(req,res)=>{
inventory.create({inventory_id:req.body.id,inventory_type:req.body.type,itemname:req.body.itemname,quantity:req.body.quantity}).then((data)=>{
    res.status(200).send("stocks added");
}).catch((err)=>{
     res.status(400).send(err)
})
})

app.get("/inventory",(req,res)=>{
    inventory.find().then((userdata)=>{ 
        
       all.push(userdata)
       
        res.render("inventory",{all})
    })
})
app.get("/inventory/furniture",(req,res)=>{
    inventory.find({inventory_type:"Furniture"}).then((furnitures)=>{
        res.status(200).send(furnitures);
    })
})
app.get("/inventory/electronics",(req,res)=>{
    inventory.find({inventory_type:"Electronics"}).then((furnitures)=>{
        res.status(200).send(furnitures);
    })
})

app.get("/customers",(req,res)=>{
    res.render("customer",{customer})
})


app.post("/createorder",(req,res)=>{
    inventory.find({inventory_id: req.body.inventory_id}).then((data)=>{
        if(data[0].quantity >= req.body.quantity)
        {
            order.create({customer_id:req.body.id,inventory_id:req.body.inventory_id,itemname:req.body.itemname,quantity:req.body.quantity}).then((update)=>{
               let available = data[0].quantity - req.body.quantity
               inventory.updateOne({inventory_id : req.body.inventory_id},{$set :{quantity:available}}).then((quans)=>{
                res.status(200).send("updated")
               })
            })
        }
        else
        {
            res.status(400).send("out of stocks")
        }
    })
})
app.get("/sales",(req,res)=>{
    order.find({itemname : req.body.itemname}).then((orders)=>{
       let totalsales = 0;
       orders.forEach((item)=>{
          totalsales+=item.quantity;
      })
      res.status(200).json(totalsales)
    })
  })