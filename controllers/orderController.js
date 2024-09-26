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
    static async Order(
        u_id
    ){
        const orders=await new order({
            u_id,
           
        }).save()
        return orders
    }
   static async Order_cancle(
    _id,product
   ){
    const can=await order.findOneAndUpdate({_id},
        {$pull:{cart:{product}}})
        return can
   }
}
module.exports=orderController