const mongoose = require("mongoose")

const inventSchema = new mongoose.Schema([{
    inventory_id:{
        type:String,
        required:true
    },
    inventory_type:{
        type:String,
        required:true
    },
    itemname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },

}])

const inventModal = mongoose.model("inventory",inventSchema)
module.exports = inventModal