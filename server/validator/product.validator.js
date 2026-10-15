import z from "zod";

const productSchema = z.object({
  name: z
    .string({ message: "Name Is Required" })
    .trim()
    .min(3, "Product Name Must Be At least 3 characters")
    .max(100, "Product Name Cannot Exceed 100 Characters"),
    
  description: z
    .string({ message: "Description Is Required" })
    .trim() 
    .min(10, "Description Must Be At least 10 Characters"),
    
  price: z.coerce
    .number()
    .positive("Price Must Be Greater Than 0"),
    
  category: z
    .string({message: "Category Is Required" })
    .min(3, "Category Must Be At Least 3 Characters"),
    
  stock: z
  .coerce
  .number()
  .int("Stock Must Be A Whole Number")
  .min(0, "Stock Cannot Be Negative")
});

export default productSchema;