import {Schema,model} from "mongoose"
import bcrypt, { genSalt } from "bcrypt"

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

userSchema.pre("save", async function(next){
    // console.log(this)
  
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
});


const User=model("user",userSchema)

export default User