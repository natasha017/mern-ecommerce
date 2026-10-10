import User from "../models/user.model.js"
//  Register
const register=async(req,res)=>{
    try {
        const {username,email,password,phone}=req.body
        
        if(!username || !email || !password || !phone){
            return res
            .status(400)
            .json({message:"All Fields Are Required"})
        }
        
        const userExists=await User.findOne({email})
        
        if(userExists){
        return res
        .status(400)
        .json({message:"Email Already Exists"})
        
    }
    const user=await User.create({
            username,
            email,
            password,
            phone
        })
        
        return res.status(201).json({message:"Register Successfully"})

    } catch (error) {

        return res.status(500).json({message:error.message})
    }
}
const login=async(req,res)=>{
  try {
     const {email,password}=req.body

   if(!email || !password ){
    return res.status(400).json({message:"All Fields Are Required"})
   } 

   const userExists=await User.findOne({email})
   
   if(!userExists){
    return res.status(401).json({message:"Invalid Email Or Password"})
   }

   const isPasswordCorrect=await bcrypt.compare(password,userExists.password)
   if(!isPasswordCorrect){
    return res.status(401).json({message:"Invalid Email Or Password"})
   }
   
   return res.status(200).json({message:"Login Successfully"})
  
} catch (error) {
    return res.status(500).json({message:error.message}) 
}
}
const authController={
    register,
    login
}
export default authController