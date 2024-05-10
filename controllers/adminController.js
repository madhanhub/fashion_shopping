const admin=require('../Schema/admin')
const product=require('../Schema/product')
class AdminController{
    static async Addproduct(
        admin_name,admin_email,admin_password
    ){
        const addpro=await new admin({
            admin_name,admin_email,admin_password
        }).save()
        return addpro
    }
   
    static async AdminLogin(
        admin_name,admin_password
    ){
        const login=await admin.findOne({admin_name,admin_password})
        return login
    }
}
module.exports=AdminController