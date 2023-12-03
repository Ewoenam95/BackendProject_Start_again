import Registeration from "../Service/Registration.js"
import nodemailer from "nodemailer"
import * as dotenv from "dotenv"
dotenv.config()





const Registeruser = async(req,res)=>{
    try {
        const result = await Registeration(req.body)
        return res.status(result.statusCode).json({message:result.message})
        
    } catch (error) {
        console.log(error)
        
    }






}

export default Registeruser