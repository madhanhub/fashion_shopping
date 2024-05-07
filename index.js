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
const AdminController=require('./controllers/adminController')

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

app.post('/add/product',async(req,res)=>{
    try{
        const{admin_name,p_type,p_price,p_catogarie,p_size,p_colour,admin_password}=req.body
        const Admin=await AdminController.Addproduct(
            admin_name,
            p_type,
            p_price,
            p_catogarie,
            p_size,
            p_colour,
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
        const adminlogin = await admin.findOne({ admin_name, admin_password });

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
app.post('/delete/product',async(req,res)=>{
	try{
		const _id=req.body
		const pdel=await AdminController.Delproduct(_id)
		res.status(200).json({mesdage:'success',data:pdel})
	}catch(error){
		res.status(500).json({message:'failed'})
	}
})
app.post('/list/product',async(req,res)=>{
	try{
		const _id=req.body
		const listP=await AdminController.Listproduct(
			_id
		)
		res.status(200).json({message:'success',data:listP})
	}catch(error){
		res.status(500).json({message:'failed'})
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
