const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name:String,
    email:String,
    phone_number:String,
    password:String,
    profile_pic:{
        type:String,
        default:null
    },
    
},
{
    timestamps:true
})

const User=mongoose.model("User",Schema);
module.exports=User;