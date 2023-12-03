import exam from "../models/Exam.js";




const addExam = async (req,res)=>{
    try{
        
        const examBody = req.body
        examBody.teacher_id = req.user_id
        const newExam = await exam.create(examBody)
        if(newExam){
            return res.status(200).json({message:"Exam registered successfully"})
        }
        return res.status(404).json({message:"Exam not added"})
    }catch(error){
        console.log(error)
    }
}
const getAllExams = async(req,res)=>{
    const allExams = await exam.findAll()
    const examdetail = allExams.map(detail => {return {exam_id:detail.id,examName:detail.examName,duration:detail.duration,examiner:detail.teacher_id}})
    return res.status(200).json({Exam:examdetail})

}

export default {addExam,getAllExams}