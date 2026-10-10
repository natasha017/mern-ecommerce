import {Schema,model} from "mongoose"
import bcrypt from "bcryptjs";

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

const User=model("user",userSchema)
export default User