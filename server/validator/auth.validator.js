import {z} from "zod"

const signUpSchema=z.object({
    username:z
    .string({error:"Name is required"})
    .trim()
    .min(3,{error:"Name must be atleast 3 chars"})
    .max(255,{error:"Name must not be more than 255 characters"}),

    email:z
    .string({error:"Email is required"})
    .trim()
    .email({error:"Invalid Email Address"}),
    
    phone:z
    .string({error:"Phone is required"})
    .trim()
    .min(10,{error:"phone must be atleast 10 charactors"})
    .max(20,{error:"phone must not be more than 20 characters"}),
    
    password:z
    .string({error:'Password is required'})
    .min(6,{error:"Password must be atleats 6 chars"})
    .max(1024,{error:"Password can't be greater than 1024 chars"})
});

export default signUpSchema