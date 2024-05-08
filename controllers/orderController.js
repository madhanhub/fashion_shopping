const order=require('../Schema/order')
const product=require('../Schema/product')
class orderController{
    static async Order_placed(
        _id,id
    ){
        const prod=await product.findOne({_id})
        var ord=prod._id
        await order.findOneAndUpdate({id},
            {$push:{cart:{product:_id}}})
            return ord
    }
}
module.exports=orderController