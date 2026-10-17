import {z} from "zod"

const productQuerySchema=z.object({
   page:z
   .coerce 
   .number()
   .int()
   .positive()
   .min(1)
   .optional()
   .default(1)
   .catch(1),
   limit:z.coerce
   .number()
   .int()
   .positive()
   .max(50,"Limit cannot Exceed 50 Products")
   .default(4)
   .catch(4),
   category: z
   .string({ message: "Category must be a string" })
   .trim()
   .min(2, "Category name is too short")
   .optional(),
   search: z
    .string()
    .trim()
    .optional(),
    sort: z
    .enum(["price-low-high", "price-high-low", "newest"])
    .optional()
});

export default productQuerySchema