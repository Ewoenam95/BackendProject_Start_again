import deleteUser from "../Service/delete.js"
const userRemove = async (req,res)=>{
    const {id} = req.params
    const result = await deleteUser(id)
    return res.status(result.statusCode).json({message:result.message})
}




export default userRemove