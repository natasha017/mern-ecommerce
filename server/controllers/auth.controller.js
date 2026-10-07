//  Register
const register=async(req,res)=>{
    try {
        console.log(req.body)
        return res.status(200).json({message:"Hello world"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const authController={
    register
}
export default authController