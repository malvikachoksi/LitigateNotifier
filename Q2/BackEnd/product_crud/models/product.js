const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    name:String,
    price:Number,
    qty:Number,
    image:{
        type:Array,
        default:[]
    }
})

const Product=mongoose.model("product",Schema)

module.exports=Product;