import {z} from "zod"

const emailSchema = z
    .string({message: "Email is required" })
    .trim()
    .email({message: "Invalid Email Address" });
    const passwordSchema=z
    .string({message:'Password is required'})
    .min(6,{message:"Password must be atleats 6 chars"})
    .max(1024,{message:"Password can't be greater than 1024 chars"})

const signUpSchema=z.object({
    username:z
    .string({message:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 chars"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    
    email:emailSchema,
    
    phone:z
    .string({ message: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
    
    password:passwordSchema
});

const signInSchema=z.object({
   email:emailSchema, 
   password:passwordSchema
});

const authValidators={
    signUpSchema,
    signInSchema
}

export default authValidators