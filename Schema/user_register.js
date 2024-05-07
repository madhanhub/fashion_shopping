const mongoose=require('mongoose')
const user=new mongoose.Schema({
    user_name:{
        type:String
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