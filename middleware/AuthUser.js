import user from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()


const AuthUser = async (req,res,next)=>{
    try{
        const {email,password}= req.body 
        const existingUser = await user.findOne({where:{email}})
        if(!existingUser){
            return res.status(404).json({"message":"email already exists"})
        }
        const comparePasswords = await bcrypt.compare(password,existingUser.password)
        if(!comparePasswords){
            return res.status(404).json({"message":"invalid credentials"})
        }
        const tokenBody = {email:email, id:existingUser.id}
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(tokenBody,secret,{expiresIn:"1h"})
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
        // const body= req.body
        const secret = process.env.TOKEN_SECRET
        const{id}=req.params

        const verifyuser = await jwt.verify(token, secret)
        if(id==verifyuser.id){
            // return res.status(200).json({message:"token verified successfully"})
            next()
        }
       
        }
        catch(error){

            console.log(error)
        }


}


export default {AuthUser,TokenVerification}