const LoginUser = async(body)=>{
    if(body){
        return {statusCode:200,message:'Login Successful'}
    }
}

export default LoginUser