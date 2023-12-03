import LoginUser from "../Service/Login.js";

const LoggingUser = async (req,res)=>{
    const token = req.token
    const user= req.user
    const result = await LoginUser.LoginUser(req.body)
    return res.status(result.statusCode).json({message:result.message,token:token,user:user})
}

const LoginInTeacher = async(req,res)=>{
    const token = req.token
    const user = req.user
    
    const result = await LoginUser.LoginTeacher(req.body)
    return res.status(result.statusCode).json({message:result.message,token:token,user:user})

}

export default {LoggingUser,LoginInTeacher}