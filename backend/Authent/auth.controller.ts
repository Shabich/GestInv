import { Request, Response } from 'express'
import { signup, signin } from './auth.service'

export class AuthController {
  static async Signup(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body)
      const { email, password, nom, prenom } = req.body
      if (!email || !password || !nom || !prenom) {
        res.status(400).json({ message: "L'un des champs est manquant" })
        return
      }

      const userId = await signup(email, password, nom, prenom)
      res.status(201).json({ message: 'Compte crée', userId })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  static async Signin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        res.status(400).json({ message: "L'un des champs est manquant" })
        return
      }

      const token = await signin(email, password)
      res.status(200).json({ message: 'Connection reussie', token })
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  }
}
