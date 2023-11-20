import Controller from '../controller/registerUser.js'
import express from 'express'
import LoggingUser from '../controller/LoginUser.js'
import AuthUser from '../middleware/AuthUser.js'
import Validator from '../Validator/validator.js'
import UpdatingUser from '../controller/UpdateUser.js'
import userRemove from '../controller/delete.js'


const router = express.Router()
router.post('/users/user-registrations',Validator,Controller)
router.post('/login-user',Validator,AuthUser.AuthUser,LoggingUser)
router.put('/update-user/:id',Validator,AuthUser.TokenVerification,UpdatingUser)
router.delete('/delete-user/:id',AuthUser.TokenVerification,userRemove)


export default router