import dotenv from "dotenv"
dotenv.config()

import express from "express"
import authRouter from "./routes/auth.routes.js"

const app= express()
const PORT=process.env.PORT

app.use("/api/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`Server Is Running At Port ${PORT}`)
});