const LoginUser = async(body)=>{
    if(body){
        return {statusCode:200,message:'Login Successful'}
    }
}

const LoginTeacher = async(body)=>{
    if(body){
        return {statusCode:200,message:"teacher login successfully"}
    }
}

export default {LoginUser,LoginTeacher}