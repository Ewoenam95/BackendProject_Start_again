import Database from "./Db/DbConfig.js";
import express from "express"
import * as dotenv from "dotenv"
import UserRoutes from "./Route/registerRoute.js"
import bodyParser from "body-parser";
import teacherUseRoute from "./Route/teacherUseRoute.js"
import studentRoute from "./Route/studentStudentRoute.js"
import cors from "cors"
import finalResultTable from "./models/finalResult.js";
import exam from "./models/Exam.js"
import result from "./models/Result.js";
import Question from "./models/Question.js";

dotenv.config()


const port = process.env.PORT 
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/user',UserRoutes)
app.use('/teacher',teacherUseRoute)
app.use("/student",studentRoute)

try {
    await Database.authenticate()
    app.listen(port,()=>{
        console.log("Database connected and listening at port number",port)
    })
    
} catch (error) {
    console.log(error)
    
}

(async ()=>{
    await Database.sync()
})()