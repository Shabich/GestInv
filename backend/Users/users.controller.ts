import { Request, Response } from 'express'
import { UsersService } from './users.service'
import bcrypt from 'bcryptjs';

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
  
      res.json( user );
    } catch (e: any) {
      res.status(500).json({ err: e.message });
    }
  }
  



  static async update(req: Request, res: Response){
    try {
      const id = parseInt(req.params.id, 10);
      const { current_password, new_password, adresse_mail, ancienne_adresse_mail, ...user } = req.body; // Extraction des champs
  
      if (!id || !current_password) {
        return res.status(400).json({ message: "ID et mot de passe actuel requis" });
      }
  
      const storedUser = await UsersService.validateUser(ancienne_adresse_mail, current_password);
      
      if (!storedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const passwordToUpdate = new_password ? await bcrypt.hash(new_password, 10) : storedUser.password;
      const adresseMailToUpdate = (adresse_mail != ancienne_adresse_mail) ? adresse_mail : ancienne_adresse_mail;
      await UsersService.update({ ...user, adresse_mail:adresseMailToUpdate, password: passwordToUpdate }, id);
  
      res.json({ message: "Utilisateur mis à jour" });
    } catch (e: any) {
      res.status(500).json({ err: e.message });
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
