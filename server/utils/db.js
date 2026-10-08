import mongoose from "mongoose";

const connectToDb=async(URI)=>{
  try {
    await mongoose.connect(URI) 
    console.log("Database Connect Successfully")
  } catch (error) {
    console.log("Database Connection Failed",error.message)
    process.exit(1)
  } 
}
export default connectToDb