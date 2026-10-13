import { promise } from "zod";
import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

const createProduct=async(req,res,next)=>{
    try {
    const { name, description, price, category, stock } = req.body;
    const file=req.file

    if(!file){
        return res.status(400).json({message:"Product Image Is Required"})
    }
   
    const result=await new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder:"Products"},
            (error,result)=>{
                if(error){
                    return reject(error)
                }
                return resolve(result)
            }
        )
        stream.end(file.buffer)
    })
const image = {
  id: result.public_id,
  url: result.secure_url
};
const newProduct=await Product.create({name, description, price, category, stock, image});
    return res
    .status(201)
    .json({message:"Product Created Successfully"});

} catch (error) {
        next(error)
    }
};

const productController={
    createProduct
};
export default productController
