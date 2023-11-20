import user from "../models/user.js";
import bcrypt from "bcryptjs"


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
        return {statusCode:200,message:"admin created successfully"}

    }
    const {password,confirmPassword}= body
    const isEqual = password==confirmPassword
    if(isEqual){
        body.password = await bcrypt.hash(password,10)
        body.confirmPassword = await bcrypt.hash(confirmPassword,10)
        const NewUser = await user.create(body)
        return {statusCode:200,message:`${body.Role} created successfully`}

        
    }
    return {statusCode:400,message:"passwords must match"}

    
}


export default Registeration