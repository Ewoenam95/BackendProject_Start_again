import Database from "../Db/DbConfig.js";
import DataType  from "sequelize";
import exam from "./Exam.js"
import Question from "./Question.js";
import result from "./Result.js";
import finalResultTable from "./finalResult.js";
const user = Database.define("user",{
    id:{
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true,
        allowNull:false
        
    },
    firstName:{
        type:DataType.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataType.STRING,
        allowNull:false,
    },
    email:{
        type:DataType.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    phoneNumber:{
        type:DataType.STRING,
        allowNull:true

    },
    password:{
        type:DataType.STRING,
        allowNull:false,
    },
    confirmPassword:{
        type:DataType.STRING,
        allowNull:true,
    },
    Role:{
        type:DataType.STRING,
        allowNull:false,
        defaultValue:"student"
        
    },
    suspended:{
        type:DataType.STRING,
        defaultValue:false,

    }

},
{timestamps:true},{paranoid:true})

user.hasOne(exam, {foreignKey:"teacher_id"})
exam.belongsTo(user, {foreignKey:"teacher_id"})

exam.hasMany(Question,{foreignKey:"exam_id"})
Question.belongsTo(exam,{foreignKey:"exam_id"})

user.hasMany(result ,{foreignKey:"student_id"})
result.belongsTo(user, {foreignKey:"student_id"})

user.hasOne(finalResultTable,{foreignKey:"student_id"})
finalResultTable.belongsTo(user,{foreignKey:"student_id"})

// exam.hasMany(finalResultTable, {foreignKey:"examName"})
// finalResultTable.belongsTo(exam, {foreignKey:"examName"})

exam.hasOne(finalResultTable, {foreignKey:"exam_id"})
finalResultTable.belongsTo(exam, {foreignKey:"exam_id"})





export default user
