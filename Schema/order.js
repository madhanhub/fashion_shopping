const mongoose=require('mongoose')
const orders=new mongoose.Schema({
   u_id:{
type:String
   },
    cart:[{
        product:{
            type:String,
            
    }
}]
})
module.exports=mongoose.model('order',orders)