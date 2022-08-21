const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
 
const userModals = mongoose.model("user",userSchema)

module.exports = userModals;