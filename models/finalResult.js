import Database from "../Db/DbConfig.js";
import DataType from "sequelize";

const finalResultTable = Database.define("finalResultTable",{
    id:{
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    examName:{
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
    },
    student_id:{
        type:DataType.UUID,
        // defaultValue:DataType.UUIDV4,
        References:{
            model:"user",
            key:"id"
        }

    },
    TotalAnsweredCorrectly:{
        type:DataType.STRING,
        allowNull:false

    },
    TotalQuestions:{
        type:DataType.STRING,
        allowNull:false
    },
    percentage:{
        type:DataType.INTEGER,
        allowNull:false
    }









},{timestamps:true},{paranoid:true})


export default finalResultTable