import UpdateUser from "../Service/update.js"
const UpdatingUser = async(req,res)=>{
    const id=req.user_id
    const body = req.body
    const result = await UpdateUser(id,body)
    return res.status(result.statusCode).json({message:result.message})
}
export default UpdatingUser