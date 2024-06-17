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
}
module.exports=orderdetailController