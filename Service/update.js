import user from "../models/user.js"
import bcrypt from "bcryptjs"
const UpdateUser = async(id,body)=>{
    const findexisting = await user.findByPk(id)
    if(findexisting){
        if(findexisting.Role=='admin'){
            const {password} = body
            body.password = await bcrypt.hash(password,10)
            const update = await user.update(body,{where:{id}})
            return {statusCode:200,message:"user updated successfully"}

        }

        const {password,confirmPassword}=body
        const isEqual = password==confirmPassword
        if(isEqual){
            body.password = await bcrypt.hash(password,10)
            body.confirmPassword = await bcrypt.hash(confirmPassword,10)

            const update = await user.update(body,{where:{id}})
            return {statusCode:200,message:"user updated successfully"}
        }
        return {statusCode:404,message:"passwords must match"}
    }

    
    return {statusCode:404, message:"user not found"}

}



export default UpdateUser