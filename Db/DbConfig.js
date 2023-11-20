import Sequlize from "sequelize"
import * as dotenv from "dotenv"
dotenv.config()



const Database = new Sequlize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.HOST,
    dialect:"mysql",
    logging:false

})

export default Database