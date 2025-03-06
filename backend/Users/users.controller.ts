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
    }catch(e: any){
      res.status(500).json({err: e.message})
    }
  }
  static async getUserInfo(req: Request, res: Response) {
    try {  
      const email = req.body.adresse_mail;
      const password = req.body.password;
  
      if (!email || !password) {
        return res.status(400).json({ err: "Email ou mot de passe manquant" });
      }
  
      const user = await UsersService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ err: "Identifiants incorrects" });
      }
  
      res.json({ message: "User trouvé", user });
    } catch (e: any) {
      res.status(500).json({ err: e.message });
    }
  }
  
  static async update(req: Request, res: Response): Promise<void> {
    try{
      const id = parseInt(req.params.id, 10);
      const user = req.body as Users;
      await UsersService.update(user, id);
      res.json({ message: 'User mis à jour' });
    }catch(e: any){
      res.status(500).json({err: e.message})
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
