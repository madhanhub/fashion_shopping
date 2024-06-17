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
    product_deliveredOn:{
        type:Date
    }
})
module.exports=mongoose.model('orderdetails',order_detail)