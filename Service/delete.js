import user from "../models/user.js"
const Userdelete= async(id)=>{
    const findexisting = await user.findByPk(id)
    if(findexisting){
        const removeuser = await user.destroy({where:{id}})
        return {statusCode:200,message:"deleted successfully"}
    }
    return {statusCode:404, message:"user not found"}
}



export default Userdelete