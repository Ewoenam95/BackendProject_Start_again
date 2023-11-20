import LoginUser from "../Service/Login.js";

const LoggingUser = async (req,res)=>{
    const token = req.token
    const user= req.user
    const result = await LoginUser(req.body)
    return res.status(result.statusCode).json({message:result.message,token:token,user:user})
}

export default LoggingUser