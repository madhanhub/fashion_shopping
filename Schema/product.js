const mongoose=require('mongoose')
const products=new mongoose.Schema({
   
    p_type:{
        type:String
    },
    p_catogarie:{
        type:String
    },
    p_price:{
        type:Number
    },
    p_colour:{
        type:String
    },
    p_size:{
        type:String
    },

})
module.exports=mongoose.model('product',products)