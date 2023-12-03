import user from "../models/user.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import * as dotenv from "dotenv"
dotenv.config()


const Registeration = async(body)=>{
    const {email}= body
    const findexisting = await user.findOne({where:{email}})
    if(findexisting){
        return {statusCode:404,message:"email already existing"}

    }
    if(body.Role=='admin'){
        const{password}=body
        body.password = await bcrypt.hash(password,10)
        const NewUser = await user.create(body)
        SendEmailOnRegister(email)
        return {statusCode:201,message:"admin created successfully"}

    }
    const {password,confirmPassword}= body
    const isEqual = password==confirmPassword
    if(isEqual){
        body.password = await bcrypt.hash(password,10)
        body.confirmPassword = await bcrypt.hash(confirmPassword,10)
        const NewUser = await user.create(body)
        SendEmailOnRegister(email)
        return {statusCode:201,message:`${body.Role} created successfully`}

        
    }
    return {statusCode:400,message:"passwords must match"}

    
}




function SendEmailOnRegister(email){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"jamesadogo8@gmail.com",
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:"jamesadogo8@gmail.com",
        to:email,
        subject:"Registration Notice",
        text:"Congratulations on your Registration,"
    }
    try{
         transporter.sendMail(mailOptions)

    }catch(error){
        console.log(error)
    }
}


export default Registeration