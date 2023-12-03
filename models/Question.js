import Database from "../Db/DbConfig.js";
import DataType  from "sequelize";
import result from "./Result.js";

const Question = Database.define("Question",{ 
    id:{
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false,
    },
    questionText:{
        type:DataType.STRING,
        allowNull:false,

    },
    correctAnswer:{
        type:DataType.STRING,
        allowNull:false
    },
    options:{
        type:DataType.STRING,
        allowNull:false,
    },
    
    exam_id:{
        type:DataType.UUID,
        // defaultValue:DataType.UUIDV4,
        References:{
            model:"exam",
            key:"id"
        }
    }







},{timestamps:true},{paranoid:true})


Question.hasOne(result,{foreignKey:"question_id"})
result.belongsTo(Question, {foreignKey:"question_id"})



export default Question