const mongoose=require('mongoose')
const orders=new mongoose.Schema({
    u_id:{
        type:String
    },
    p_id:{
        type:String
    },
    quantity:{
        type:Number
    }
})
module.exports=mongoose.model('order',orders)