const mongoose=require('mongoose')
const validator=require('../validation')
const user=new mongoose.Schema({
    user_name:{
        type:String,
        validate:{
            validator:validator.user_name,
            message:'invalid user name'
        }
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile_no:{
        type:String
    },
    
})
module.exports=mongoose.model('user_register',user)