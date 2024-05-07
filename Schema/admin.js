const mongoose=require('mongoose')
const Admin=new mongoose.Schema({

    admin_name:{
        type:String
    },
    admin_password:{
        type:String
    },
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
module.exports=mongoose.model('admin',Admin)