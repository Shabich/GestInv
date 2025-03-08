import { Request, Response } from 'express';
import { CommandeService } from './commande.service';
import { Commande } from './commande.interfaces';

export class CommandeController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const commandes = await CommandeService.getAll();
      res.json(commandes);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const commandes = await CommandeService.getByUserId(id);
      res.json(commandes);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }
}

