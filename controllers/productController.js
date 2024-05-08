const product=require('../Schema/product')
class productController{
    static async Product(
        p_type,p_catogarie,p_size,p_price,p_colour
    ){
        const pro=await new product({
            p_type,p_catogarie,p_size,p_price,p_colour
        }).save()
        return pro
    }
   
    static async ProductDelete(
        _id
    ){
        const del=await product.findOneAndDelete({_id})
        return del
    }
}
module.exports=productController