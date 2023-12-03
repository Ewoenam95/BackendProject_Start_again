import express from "express"
import AuthUser from "../middleware/AuthUser.js"
import { getAllQuestion, Answerquestion, studentResult} from "../controller/Question.js"
import Exam from "../controller/Exam.js"

const router = express.Router()
router.get('/all-questions/:exam_id',AuthUser.TokenVerification,getAllQuestion)

router.post('/answer-questions/:question_id',AuthUser.TokenVerification,Answerquestion)

router.get('/final-result/:exam_id',AuthUser.TokenVerification,studentResult)

router.get('/all-exams',AuthUser.TokenVerification,Exam.getAllExams)


export default router


