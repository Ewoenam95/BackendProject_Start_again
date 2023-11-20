import joi from "joi"

const schema = joi.object({
    lastName: joi.string().trim().min(3).max(40).messages({
        "string.string":"should be a string",
        "any.required":"lastName cant be left empty",
        "string.min":"lastname should be at list 3 characters in length",
        "string.max":"maximum string length exceeded"

    }),
    firstName: joi.string().trim().min(3).max(40).messages({
        "any.required":"Last Name cant be left empty",
        "string.min":"lastName should be at least 3 characters in length",
        "string.max":"maximum length of characters of characters exceeded"
    }),
    email:joi.string().required().email({minDomainSegments:2,tlds:{allow:['com','net']}}).messages({
        "any.required":"email field cannot be left empty",
        "string.email":"wrong email format"
    }),
    phoneNumber:joi.string().min(10).max(13).trim().messages({
        "string.min":"phone number should have at least 10 digits",
        "string.max":"phone number should not exceed 13 digits",
        // "any.required":"phone Number cant be left empty"


    }),
    password:joi.string().trim().min(8).pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z!@#$%&*]/).messages({
        "any.required":"password cant be left empty",
        "string.min":"password shoul have at least 8 characters",
        "string.pattern.base":"password should contain at least one number,letter and special characters !, @, #,$ ,% ,& , *,"
    }),
    confirmPassword:joi.string().trim().min(8).pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z!@#$%&*]/).messages({
        "any.required":"password cant be left empty",
        "string.min":"password shoul have at least 8 characters",
        "string.pattern.base":"password should contain at least one number,letter and special characters !, @, #,$ ,% ,& , *,"
    }),   
    Role:joi.string().min(5).messages({
        "any.required":"Role cant be left empty"

    })






})

const Validator = async (req,res,next)=>{
    const {error} =  schema.validate(req.body,{abortEarly:false})
    if(error){
        const errorDetails = error.details.map(details=>details.message)
        return res.status(404).json({error:errorDetails})
    }
    next()
}

export default Validator