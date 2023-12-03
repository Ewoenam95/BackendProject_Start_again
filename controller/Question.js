import Question from "../models/Question.js"
import exam from "../models/Exam.js"
import result from "../models/Result.js"
import finalResultAnalysis from "../models/finalResult.js"



const addQuestion = async(req,res)=>{
    const questionBody = req.body.questionArray
    const {exam_id}=req.params
    const findExam = await exam.findOne({where:{id:exam_id}})
    if(findExam){
        for(let question of questionBody){

            question.exam_id=req.exam_id
            await Question.create(question)
        }
                return res.status(200).json({message:"questions added successfully"})
    }
}
const getAllQuestion = async (req,res)=>{
    try{
        const {exam_id}=req.params
        const allQuesttionsForExams = await Question.findAll({where:{exam_id}})
        const examdetail = await exam.findOne({where:{id:exam_id}})

        if(examdetail){
            const questions= allQuesttionsForExams.map(detail=>{return {question_id:detail.id,question:detail.questionText,possibleanswers:detail.options.split("/")}})
            return res.status(200).json({message:{examName:examdetail.examName,exam_id:examdetail.id,duration:examdetail.duration},questions:questions})
        }
        
    }catch(error){
        console.log(error)
    }
}

const Answerquestion = async(req,res)=>{
    try{
    const {question_id} =req.params
    // const {studentAnswer} = req.body
    const answerBody = req.body
    answerBody.question_id=question_id
    answerBody.student_id= req.user_id
    const AnswerCompare = await Question.findOne({where:{id:question_id}})
    const findexistingresult = await result.findOne({where:{question_id:question_id,student_id:req.user_id}})
    if(findexistingresult){
        if(AnswerCompare.correctAnswer==answerBody.studentAnswer){
            answerBody.markPerQuestion=1
            await result.update(answerBody,{where:{question_id}})
            return res.status(200).json({message:"update"})
        }
        answerBody.markPerQuestion=0
        await result.update(answerBody,{where:{question_id:question_id}})
        return res.status(200).json({message:"update"})

    }

    if(AnswerCompare.correctAnswer==answerBody.studentAnswer){
        answerBody.markPerQuestion = 1
        const sendcorrectAnswer = await result.create(answerBody)
        return res.status(200).json({message:"success"})
    }
    
    answerBody.markPerQuestion = 0
    const sendwrongAnswer = await result.create(answerBody)
    return res.status(200).json({message:"success"})    
    
}catch(error){
    console.log(error)``
}
}

const studentResult = async(req,res)=>{
    const {exam_id}=req.params
    // const final_result = await result.findAll({where:{markPerQuestion:1,student_id:id}}).length
    const fullmarks = await exam.findOne({where:{id:exam_id},include:[{model:Question,include:[{model:result, where:{markPerQuestion:1,student_id:req.user_id}}]}]})
    // console.log(fullmarks)
    const resultTable = fullmarks.Questions.map(detail=>{return {exam_id:detail.exam_id,student_id:detail.result.student_id,question_id:detail.result.question_id}})
    const total_marks = await Question.findAll({where:{exam_id}})

    const percentage= (resultTable.length/total_marks.length*100)

    const finalResultTable = {examName:fullmarks.examName,exam_id:resultTable[0].exam_id,student_id:resultTable[0].student_id,totalAnsweredCorrectly:resultTable.length,total_questions:total_marks.length,percentage:percentage}
    const finalTable = {examName:finalResultTable.examName,exam_id:finalResultTable.exam_id,student_id:finalResultTable.student_id,TotalAnsweredCorrectly:finalResultTable.totalAnsweredCorrectly,TotalQuestions:finalResultTable.total_questions,percentage:finalResultTable.percentage}
    const creatTable = await finalResultAnalysis.create(finalTable)

    return res.status(200).json(finalResultTable)
}

export {addQuestion,getAllQuestion,Answerquestion,studentResult}
