import dotenv from "dotenv"
dotenv.config()
import express from "express"
import authRouter from "./routes/auth.routes.js"
import connectToDb from "./utils/db.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import productRouter from "./routes/product.routes.js"
import { v2 as cloudinary } from "cloudinary";


 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const app= express()
const PORT=process.env.PORT
const URI=process.env.MONGODB_URI
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use("/api/auth",authRouter)
app.use("/api/products",productRouter)
//errormiddleware
app.use(errorMiddleware)


const startServer=async()=>{
try {
    await connectToDb(URI)
    app.listen(PORT,()=>{
    console.log(`Server Is Running At Port ${PORT}`)
});
} catch (error) {
    console.log(error) 
}
}
startServer()