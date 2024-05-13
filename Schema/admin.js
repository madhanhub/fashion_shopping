const mongoose=require('mongoose')
const validator=require('../validation')
const Admin=new mongoose.Schema({

    admin_name:{
        type:String,
        validate: {
            validator: validator.admin_name,
            message: ' admin_name.',
          },
    },
    admin_password:{
        type:String,
        // validate: {
        //     validator: validator.admin_password,
        //       message: 'Invalid password.',
        //     },
    },
    admin_email:{
        type:String,
         validate: {
            validator: validator.admin_email,
        message: 'Invalid email.',
      },
    },

})
module.exports=mongoose.model('admin',Admin)