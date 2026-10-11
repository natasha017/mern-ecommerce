import {Schema,model} from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
//schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
      type:String,
      required:true  
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
//hashPassword Middleware
userSchema.pre("save",async function(next){
    const user=this
    if(!user.isModified("password")){
        return next()
    }
    try {
        const saltRound=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(user.password,saltRound)
        user.password=hashPassword
    } catch (error) {
        next(error)
    }
})
//generate Token
userSchema.methods.generateToken=function(){
try {
    return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"30d"}
)
} catch (error) {
   
}
}
//compare password
userSchema.methods.comparePassword=async function(password){
    try {
      return bcrypt.compare(password,this.password)  
    } catch (error) {
         console.error(error)
    }
}

const User=model("user",userSchema)
export default User