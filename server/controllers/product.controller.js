import Product from "../models/product.model.js";

const createProduct=async(req,res,next)=>{
    try {
    
    const { name, description, price, category, stock, image } = req.body;
    
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
