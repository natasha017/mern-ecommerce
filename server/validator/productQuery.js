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
   .catch(4)
});

export default productQuerySchema