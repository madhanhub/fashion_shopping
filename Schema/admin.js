const mongoose=require('mongoose')
const Admin=new mongoose.Schema({

    admin_name:{
        type:String
    },
    admin_password:{
        type:String
    },
    admin_email:{
        type:String
    },

})
module.exports=mongoose.model('admin',Admin)