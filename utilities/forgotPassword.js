import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import user from "../models/user.js"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()
const secret = process.env.TOKEN_SECRET
const forgotPassword = async (req,res)=>{
    const {email}= req.body
    const findexisting = await user.findOne({where:{email}})
    if(!findexisting){
        return res.status(404).json({message:"email not found"})
    }
    const tokenBody = {email:email,id:findexisting.id}
    const tokenforreset = jwt.sign(tokenBody,secret,{expiresIn:"30M"})
    await sendPasswordResetMail(email,tokenforreset)
    return res.status(200).json({message:"password reset email sent to",email})
}
async function sendPasswordResetMail(email,token){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"jamesadogo8@gmail.com",
            pass:process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:"jamesadogo8@gmail.com",
        to:email,
        subject:"Password Reset",
        text: `click on the link to reset your password http://localhost:10000/user/reset-password/${token}`
    }
    try {
        await transporter.sendMail(mailOptions)
        // return res.status(200).json({message:"Password reset mail sent"})
    } catch (error) {
        console.log(error)
        
    }
}
// async resetPassword
const resetPassword = async(req,res)=>{
    res.render("<input type='text' />")

    const {token}= req.params
    const updatebody = req.body
    const verify = jwt.verify(token,secret)
    const {email}= verify
    const findexisting = await user.findOne({where:{email}})
    if(!findexisting){
        return res.status(404).json({message:"email not found"})
    }
    findexisting.password = await bcrypt.hash(updatebody.password,10)
    findexisting.confirmPassword = await bcrypt.hash(updatebody.confirmPassword,10)
    const UpdatedUser = await user.update(updatebody,{where:{email}})
    return res.status(200).json({message:"success"})
}
export default {forgotPassword,resetPassword}
