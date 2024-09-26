const order_detail=require('../Schema/orderdetails')
class orderdetailController{
    static async order_D(
        orderId,productId,p_price,quantity
    ){
        const order_d=await new order_detail(
            orderId,
			productId,
			p_price,
			quantity,
            
        ).save()
        return order_d
    }
    static async Summa(
        _id
    ){
        const su=await product.findOne({_id})
        return su
    }
}
module.exports=orderdetailController