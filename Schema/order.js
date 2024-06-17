const mongoose=require('mongoose')
const orders=new mongoose.Schema({
   u_id:{
type:String
   },
    cart:[{
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
    
}]
})
module.exports=mongoose.model('order',orders)