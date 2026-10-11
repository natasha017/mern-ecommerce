import { Schema,model } from "mongoose";
//productSchema
const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
      type:String,
      required:true  
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    image:{
      id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    }
},{timestamps:true});
const Product=model("product",productSchema)
export default Product