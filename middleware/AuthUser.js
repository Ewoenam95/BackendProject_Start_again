import user from "../models/user.js";
import exam from "../models/Exam.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()


const AuthUser = async (req,res,next)=>{
    try{
        const {email,password}= req.body 
        const existingUser = await user.findOne({where:{email}})
        if(!existingUser){
            return res.status(404).json({"message":"email not found"})
        }
        const comparePasswords = await bcrypt.compare(password,existingUser.password)
        if(!comparePasswords){
            return res.status(404).json({"message":"invalid credentials"})
        }
        const tokenBody = {email:email, id:existingUser.id}
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(tokenBody,secret,{expiresIn:"10h"})
        req.token =token
        req.user = existingUser

        next()
    }catch(error){
        console.log(error)
    }
}
const TokenVerification = async(req,res,next)=>{
    try{
            const token = req.headers.token
            if(!token){
                return res.status(404).json({message:"token not provided"})

            }


            const secret = process.env.TOKEN_SECRET
            const verifyuser = await jwt.verify(token, secret)
            const existingId = verifyuser.id
            const findexisting = await user.findOne({where:{id:existingId}})

            if(findexisting){
                req.user_id = existingId
                // return res.status(200).json({message:"token verified successfully"})
                next()
            }
        
       
        }
        catch(error){

            console.log(error)
        }


}
const ExamQuestionVerification = async (req,res,next)=>{
    try {
        const token = req.headers.token
        const secret = process.env.TOKEN_SECRET
        const verify = jwt.verify(token,secret)
        const id = verify.id
        const {exam_id} =req.params
        const findexsitingteacher = await user.findOne({where:{id}})
        const findExam = await exam.findOne({where:{id:exam_id}})
        if(findexsitingteacher){
            if(findExam){
                req.exam_id=exam_id
                next()
            }
            
        }
        
    } catch (error) {
        console.log(error)
        
    }
}


const LoginTeacher = async(req,res,next)=>{
    try{
        const {email,password} = req.body 
        const findexisting = await user.findOne({where:{email}})
        if(!findexisting){
            return res.status(404).json({message:"email not found"})

        }
        const comparePasswords = await bcrypt.compare(password,findexisting.password)
        if(!comparePasswords){
            return res.status(400).json({message:"invalid credentials"})
        }
        if(!(findexisting.Role=="teacher")){
            return res.status(404).json({message:"user not a teacher"})
        }
        const secret = process.env.TOKEN_SECRET
        const tokenBody = {email:email,id:findexisting.id}
        const token = await jwt.sign(tokenBody,secret,{expiresIn:'5hr'})
        req.token=token 
        req.user= findexisting
        next()
}catch(error){
    console.log(error)
}

}


export default {AuthUser,TokenVerification,ExamQuestionVerification,LoginTeacher}