const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer_id:{
        type:String,
        required:true
    },
    inventory_id:{
        type:String,
        required:true
    },
    itemname:{
        type:String,
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    }
})
 
const orderModals = mongoose.model("order",orderSchema)

module.exports = orderModals