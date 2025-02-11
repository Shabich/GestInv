import { Request, Response } from 'express'
import { UsersService } from './users.service'
import { Users } from './users.interfaces'

export class UsersController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UsersService.getAll()
      res.json(users)
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
  static async getById(req: Request, res: Response){
    try{
      const id = parseInt(req.params.id, 10)
      const user = await UsersService.getById(id)
      res.json(user)
    }catch(e){
      res.status(500).json({err: e})
    }
  }
  static async update(req: Request, res: Response): Promise<void> {
    try{
      const user = req.body as Users;
      await UsersService.update(user);
    }catch(e){
      res.status(500).json({err: e})

    }
  }
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10)
      await UsersService.delete(id)
      res.json({ message: 'User supprimé' })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}
