const user=require('../Schema/user_register')
class userController{
    static async UserRegister(
        user_name,email,password,mobile_no
    ){
        const user_register=await new user({
            user_name,email,password,mobile_no
        }).save()
        return user_register
    }
    static async UserLogin(
        email,password
    ){
        const U_Login=await user.findOne({email,password})

        return U_Login
    }
}
module.exports=userController