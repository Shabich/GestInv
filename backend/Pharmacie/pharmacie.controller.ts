import { Request, Response } from 'express';
import { pharmacieService } from './pharmacie.service';
import { Pharmacie } from './pharmacie.interfaces';

export class pharmacieController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const commandes = await pharmacieService.getAll();
      res.json(commandes);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const pharmacies = await pharmacieService.getById(id);
      res.json(pharmacies);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }
  static async create(req: Request, res: Response): Promise<void> {
      try {
        const pharmacie = req.body as Pharmacie;
        const id = await pharmacieService.create(pharmacie);
        res.status(201).json({ message: 'Pharmacie créé', id });
      } catch (err : any) {
        res.status(500).json({ error: err.message });
      }
    }
  
    static async update(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id, 10);
        const pharmacie = req.body as Pharmacie;
        await pharmacieService.update(id, pharmacie);
        res.json({ message: 'Pharmacie mis à jour' });
      } catch (err : any) {
        res.status(500).json({ error: err.message });
      }
    }
  
    static async delete(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id, 10);
        await pharmacieService.delete(id);
        res.json({ message: 'Pharmacie supprimé' });
      } catch (err : any) {
        res.status(500).json({ error: err.message });
      }
    }
}

