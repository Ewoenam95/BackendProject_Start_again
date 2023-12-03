import Database from "../Db/DbConfig.js";
import DataType from "sequelize"
// import user from "./user.js"

const result= Database.define("result",{
    id:{
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true,

    },
    studentAnswer:{
        type:DataType.STRING,
        allowNull:false,

    },
    markPerQuestion:{
        type:DataType.INTEGER,
        allowNull:false,
    },
    question_id:{
        type:DataType.UUID,
        allowNull:false,
        References:{
            model:"Question",
            key:"id"
        }

    },
    student_id:{
        type:DataType.UUID,
        allowNull:false,
        References:{
            model:"user",
            key:"id"
        }

    }    
},{timestamps:true},{paranoid:true})
export default result