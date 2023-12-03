import exams from "../controller/Exam.js";
import express from "express"
import AuthUser from "../middleware/AuthUser.js";
import {addQuestion } from "../controller/Question.js";
import multer from "multer"
import uploadExcel from "../controller/upload.js";


const storage =  multer.memoryStorage()
const upload = multer({storage:storage})


const router = express.Router()
router.post('/register-examination',AuthUser.TokenVerification,exams.addExam)

router.post('/add-question',upload.single('file'),uploadExcel)
router.post('/add-question/:exam_id',AuthUser.ExamQuestionVerification,addQuestion)






export default router