import { Request, Response } from 'express';
import { ProduitService } from './produit.service';
import { Produit } from './produit.interfaces';

export class ProduitController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const produits = await ProduitService.getAll();
      res.json(produits);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllCategorie(req: Request, res: Response): Promise<void> {
    try {
      const categories = await ProduitService.getAllCategorie();
      res.json(categories);
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getBySearch(req: Request, res: Response): Promise<Response> {
    try {
      const text = req.params.text
      const produits = await ProduitService.getBySearch(text);
      if (!produits) return res.status(404).json({ message: 'Produit non trouvé' });
      return res.json(produits);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Une erreur inconnue s\'est produite.' });
    }
  }

  static async getAllById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const produits = await ProduitService.getByAllId(id);
      if (!produits) return res.status(404).json({ message: 'Produit non trouvé' });
      return res.json(produits);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Une erreur inconnue s\'est produite.' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const produit = await ProduitService.getById(id);
      if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
      return res.json(produit);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Une erreur inconnue s\'est produite.' });
    }
  }
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const produit = req.body as Produit;
      const id = await ProduitService.create(produit);
      res.status(201).json({ message: 'Produit créé', id });
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const produit = req.body as Produit;
      await ProduitService.update(id, produit);
      res.json({ message: 'Produit mis à jour' });
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await ProduitService.delete(id);
      res.json({ message: 'Produit supprimé' });
    } catch (err : any) {
      res.status(500).json({ error: err.message });
    }
  }
}
