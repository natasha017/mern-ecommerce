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
}

const getAllProducts=async(req,res,next)=>{
   try {
    const {page=1,limit=4,category,search,sort}=req.query
    
    const filter={}

    if(search){
        filter.$or=[
          {name:{$regex:search,$options:"i"}},
          {description:{$regex:search,$options:"i"}}  
        ]
    }

    if(category){
        filter.category=category
    }
    
    const skip=(page-1)*limit
    const sortQuery={}

    if(sort==="price-low-high"){
        sortQuery.price=1
    }else if(sort === "price-high-low"){
        sortQuery.price=-1
    }else if(sort === "newest"){
       sortQuery.createdAt=-1 
    }

    const products=await Product
    .find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    const totalProducts=await Product.countDocuments(filter)

    return res
    .status(200)
    .json({
        totalPages:Math.ceil(totalProducts/limit),
        currentPage:page,
        count:products.length,
        products  
    })
} catch (error) {
    next(error)
   }
}

const productController={
    createProduct,
    getAllProducts
};
export default productController
