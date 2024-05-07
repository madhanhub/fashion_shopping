const admin=require('../Schema/admin')
class AdminController{
    static async Addproduct(
        admin_name,p_type,p_price,p_catogarie,p_size,p_colour,admin_password
    ){
        const addpro=await new admin({
            admin_name,p_type,p_price,p_catogarie,p_size,p_colour,admin_password
        }).save()
        return addpro
    }
    static async Delproduct(
        _id
    ){
        const prodel=await admin.findOneAndDelete({_id})
        return prodel
    }
    static async Listproduct(
        _id
    ){

        const prolist=await admin.findOne({_id})
        return prolist
    }
    static async admin_login(
        admin_name,admin_password
    ){
        const login=await admin.findOne({admin_name,admin_password})
        return login
    }
}
module.exports=AdminController