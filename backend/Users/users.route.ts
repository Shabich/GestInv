import { Router } from 'express'
import { UsersController } from './users.controller'
import { verifyToken } from '../Authent/auth.middleware'

const userRoute = Router()
userRoute.post('/info', UsersController.getUserInfo)
userRoute.put('/:id',UsersController.update)
userRoute.get('/', verifyToken,UsersController.getAll)
userRoute.get('/:id', verifyToken,UsersController.getById)
userRoute.delete('/:id', verifyToken, UsersController.delete)

export default userRoute
