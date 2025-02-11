import { Router } from 'express'
import { UsersController } from './users.controller'
import { verifyToken } from '../Authent/auth.middleware'

const userRoute = Router()

userRoute.get('/', verifyToken, UsersController.getAll)
userRoute.get('/:id', verifyToken, UsersController.getById)
// userRoute.post('/', verifyToken, UsersController.create)
userRoute.put('/:id', verifyToken, UsersController.update)
userRoute.delete('/:id', verifyToken, UsersController.delete)

export default userRoute
