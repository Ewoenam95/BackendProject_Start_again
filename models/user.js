import Database from "../Db/DbConfig.js";
import DataType  from "sequelize";

const user = Database.define("User",{
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
        type:DataType.UUID,
        allowNull:true,
    },
    Role:{
        type:DataType.STRING,
        allowNull:false
    },
    resetToken:{
        type:DataType.STRING,
        allowNull:true,
    },
    resetTokenExpiration:{
        type:DataType.DATE,
        allowNull:true
    },
    suspended:{
        type:DataType.STRING,
        defaultValue:false,

    }

},
{timestamps:true},{paranoid:true})



export default user
