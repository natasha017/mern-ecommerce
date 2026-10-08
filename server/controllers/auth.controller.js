import User from "../models/user.model.js"
import bcrypt from "bcrypt"
//  Register
const register=async(req,res)=>{
    try {
        const {username,email,password,phone}=req.body
        
        if(!username || !email || !password || !phone){
            return res
            .status(400)
            .json({message:"All Fields Are Required"})
        }
        
        const userExists=await User.findOne({email:email})
        
        if(userExists){
        return res
        .status(400)
        .json({message:"Email Already Exists"})
        
    }
        const salt=10
        const hashPassword=await bcrypt.hash(password,salt)

        const user=await User.create({
            username,
            email,
            password:hashPassword,
            phone
        })
        return res.status(201).json({message:"User Created Successfully",data:user})
  
    } catch (error) {

        return res.status(500).json({message:error.message})
    }
}
const authController={
    register
}
export default authController