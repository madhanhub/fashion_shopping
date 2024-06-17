const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const morgan=require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')

const admin=require('./Schema/admin')
const user=require('./Schema/user_register')
const product=require('./Schema/product')
const order=require('./Schema/order')
const order_detail=require('./Schema/orderdetails')
const AdminController=require('./controllers/adminController')
const productController=require('./controllers/productController')
const orderController=require('./controllers/orderController')
const orderdetailController=require('./controllers/orderdetailController')

const authorization=require('./functions/auth')
const cors=require('./functions/cors')
const userController = require('./controllers/userController')
app.use(express.json())
app.use(morgan('dev'))
app.use(cors)
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.listen(2233, () => {
	console.log('SERVER Run')

	mongoose.set('strictQuery', false)
	//connecting mongodb
	mongoose
		.connect(`mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/`
			//process.env.MYDB_CONNECTION,
		// 	, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
)
		.then(() => {
			conn = mongoose.connection
			console.log('database Connected')
		})
		.catch((error) => {
			console.log('Error connecting to MongoDB:', error)
		})
})

app.get('/', async (req, res) => {
	res.json('welcome ')
})

app.post('/new/admin',async(req,res)=>{
    try{
        const{admin_name,admin_email,admin_password}=req.body
        const Admin=await AdminController.Addproduct(
            admin_name,
            admin_email,
			admin_password
    )
    await Admin.save()
        res.status(200).json({message:'success',data:Admin})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/admin/login', async (req, res) => {
    try {
        const { admin_name, admin_password } = req.body;
        const adminlogin = await AdminController.AdminLogin( admin_name, admin_password );

		if (adminlogin) {
			{
				let token = await jsonwebtoken.sign({id:adminlogin.id,admin_name:adminlogin.admin_name}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('id',adminlogin.id)
				res.setHeader('admin_name',adminlogin.admin_name)
			
				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})
				
			}
		}

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})
app.post('/product',async(req,res)=>{
	try{
		const{p_type,p_catogarie,p_size,p_price,p_colour,product_deliveredOn}=req.body
		const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    this.product_deliveredOn = threeDaysFromNow;
		const product_add=await productController.Product(
			p_type,p_catogarie,p_size,p_price,p_colour,threeDaysFromNow
		)
		res.status(200).json({message:'success',data:product_add})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/delete/product',authorization,async(req,res)=>{
	try{
		const _id=req.body
		const pdel=await productController.ProductDelete(_id)
		res.status(200).json({mesdage:'success',data:pdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/list/product',authorization,async(req,res)=>{
	try{
		const _id=req.body
		const listP=await productController.Listproduct(
			_id
		)
		res.status(200).json({message:'success',data:listP})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/product/delete',authorization,async(req,res)=>{
	try{
		const _id=req.body
		const prodel=await productController.ProductDelete(
			_id
		)
		res.status(200).json({message:'success',data:prodel})
	}catch(error){
		res.status(500).json({message:'failed',error:err.message})
	}
})

app.post('/user/register',async(req,res)=>{
	try{
		const{user_name,email,password,mobile_no}=req.body
		const new_user=await userController.UserRegister(
			user_name,
			email,
			password,
			mobile_no
		)
		res.status(200).json({message:'success',data:new_user})
	}catch(error){
		res.status(500).json({message:'failed'})	
	}
})
app.post('/user/login',async(req,res)=>{
	try{
		
		const {email,password}=req.body
		const userLogin=await userController.UserLogin(
			email,
			password
		)
		if (userLogin) {
			{
				let token = await jsonwebtoken.sign({id:userLogin.id,user_name:userLogin.user_name,email:userLogin.email}, process.env.SECRET)
				res.setHeader('token', token)
				res.setHeader('id',userLogin.id)
				res.setHeader('user_name', userLogin.user_name)
				res.setHeader('email', userLogin.email)
			
				res.status(200).json({
					success: true,
					message: 'successfully logged_in',
					data: token,
				})
				
			}
		} else {
			
		 	res
		 		.status(400)
		 		.json({ success: false, message: 'email or password invalid ' })
		 }
		 
		
	} catch (error) {
		res.status(500).json({ success: false, message: error.message, error })
		console.log(error)
	}

})
app.post('/user/list/product',authorization,async(req,res)=>{
	try{
		const _id=req.body
		const list=await userController.Product_list(_id)
		res.status(200).json({message:'success',data:list})
	}catch(error){
		res.status(500).json({ success: false})
	}
})

app.post('/order',authorization,async(req,res)=>{
	try{
		// const u_id=req.id
		
		const orders=await orderController.Order(
			u_id=req.id,
			
	)
		res.status(200).json({message:'success',data:orders})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})

app.post('/order/place',authorization,async(req,res)=>{
	try{
		const {id,_id}=req.body
		const prod=await orderController.Order_placed({
			_id,
			id
	})
		res.status(200).json({message:'success',data:prod})
	}catch(error){
		res.status(500).json({message:"failed"})
	}
})
app.post('/order/cancle',authorization,async(req,res)=>{
	try{
		const{_id,product}=req.body
		const cancle=await orderController.Order_cancle(
			_id,product
	)
		res.status(200).json({message:'order cancle',data:cancle})
	}catch(error){
		res.status(500).json({message:"failed"})
	}
})
app.post('/order/detail',async(req,res)=>{
	try{
		const{orderId,productId,p_price,quantity}=req.body
		
		const order_d=await orderdetailController.order_D({
			orderId,
			productId,
			p_price,
			quantity,
			
	})
		res.status(200).json({message:'success',data:order_d})
	}catch(errro){
		res.status(500).json({message:'failed'})
	}
})
