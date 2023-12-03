import Question from "../models/Question.js"
import XLSX from "xlsx"
const uploadExcel = async(req,res)=>{
    try{
        const excelBody = req.file.buffer
        const workbook = XLSX.read(excelBody, {type:'buffer'})  
        const jsonBody = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        const {exam_id}=req.params
        for(let row of jsonBody){
            const existingQuestion= await Question.findOne({where:{questionText:row.questionText,options:row.options,correctAnswer:row.correctAnswer}})
            if(!existingQuestion){
                row.exam_id=exam_id
                await Question.create(row)
            }
        }
        return res.status(200).json({message:"success"})
    }catch(error){
        console.log(error)
    }
    
}

export default uploadExcel