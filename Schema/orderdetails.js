const mongoose=require('mongoose')
const order_detail=new mongoose.Schema({
    orderId:{
        type:String
    },
    productId:{
        type:String
    },

    p_price:{
        type:Number
    },
    quantity:{
        type:String
    },
    
})
module.exports=mongoose.model('orderdetails',order_detail)