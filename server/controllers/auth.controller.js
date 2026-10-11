import User from "../models/user.model.js"
//  Register
const register=async(req,res,next)=>{
    try {
        const {username,email,password,phone}=req.body
        const userExists=await User.findOne({email})
        
        if(userExists){
        return res
        .status(409)
        .json({message:"Email Already Exists"})
    }
    
    const user=await User.create({
            username,
            email,
            password,
            phone
        })
        
        return res
        .status(201)
        .json({
            message:"Register Successfully",
            token:user.generateToken(),
            userId:user._id.toString()
        });

    } catch (error) {
    next(error)
    }
}
//login
const login=async(req,res)=>{
  try {
     const {email,password}=req.body

   if(!email || !password ){
    return res
    .status(400)
    .json({message:"All Fields Are Required"})
   } 

   const userExists=await User.findOne({email})
   
   if(!userExists){
    return res
    .status(401)
    .json({message:"Invalid Email Or Password"})
   }

   const isPasswordCorrect=await userExists.comparePassword(password)
   if(isPasswordCorrect){
    return res
   .status(200)
   .json({
    message:"Login Successfully",
    token:userExists.generateToken(),
    userId:userExists._id.toString()})
   }else{
     return res
    .status(401)
    .json({message:"Inavlid Email Or Password"})
   }
} catch (error) {
    return res.status(500).json({message:error.message}) 
}
}
const authController={
    register,
    login
}
export default authController