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
        type:String,
        validate:{
            validator:validator.email,
            message:'invalid email'
        },
    },
    password:{
        type:String
    },
    mobile_no:{
        type:String,
        validate:{
            validator:validator.mobile_no,
            message:'invalide movile'
        }
    },
    
})
module.exports=mongoose.model('user_register',user)