import Database from "./Db/DbConfig.js";
import express from "express"
import * as dotenv from "dotenv"
import UserRoutes from "./Route/registerRoute.js"
import bodyParser from "body-parser";

dotenv.config()


const port = process.env.PORT 
const app = express()
app.use(bodyParser.json())
app.use('/user',UserRoutes)

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