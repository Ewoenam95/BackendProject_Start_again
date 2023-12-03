import Database from "../Db/DbConfig.js";
import Datatype from "sequelize"
// import user from "./user.js";
import Question from "./Question.js";


const exam = Database.define('exam',{
    id:{
        type:Datatype.UUID,
        defaultValue:Datatype.UUIDV4,
        primaryKey:true,
        allowNull:false,


    },
    examName:{
        type:Datatype.STRING,
        allowNull:false,

    },
    duration:{
        type:Datatype.TIME,
        allowNull:false
    },
    teacher_id:{
        type:Datatype.UUID,
        // defaultValue:Datatype.UUIDV4,
    
        References:{
            model:"user",
            key:"id"
        }
}


},{timestamps:true},{paranoid:true})






export default exam