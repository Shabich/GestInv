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

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10)
      const produit = await UsersService.getById(id)
      if (!produit) return res.status(404).json({ message: 'Produit non trouvé' })
      return res.json(produit)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message })
      }
      return res.status(500).json({ error: "Une erreur inconnue s'est produite." })
    }
  }
  // static async create(req: Request, res: Response): Promise<void> {
  //   try {
  //     const produit = req.body as Users;
  //     const id = await UsersService.create(produit);
  //     res.status(201).json({ message: 'Produit créé', id });
  //   } catch (err : any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10)
      const produit = req.body as Users
      await UsersService.update(id, produit)
      res.json({ message: 'Produit mis à jour' })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10)
      await UsersService.delete(id)
      res.json({ message: 'Produit supprimé' })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}
