import db from '../config/db'
import { Produit } from './produit.interfaces'

export class ProduitService {
  static async getAll(): Promise<Produit[]> {
    const [rows] = await db.query('SELECT * FROM t_produit')
    return rows as Produit[]
  }

  static async getAllCategorie(): Promise<Produit | null> {
    const [rows]: any = await db.query('SELECT * FROM t_categorie')
    return rows || null
  }

  static async getByAllId(id: number): Promise<Produit | null> {
    const [rows]: any = await db.query('SELECT * FROM t_produit WHERE id_t_categorie= ?', [id])
    return (rows as Produit) || null
  }
  static async getBySearch(text: string): Promise<Produit | null> {
    const query = 'SELECT * FROM t_produit WHERE nom_produit LIKE ?';
    const [rows]: any = await db.query(query, [`%${text}%`]);
    return (rows as Produit);
}

  static async getById(id: number): Promise<Produit | null> {
    const [rows]: any = await db.query('SELECT * FROM t_produit WHERE id_t_produit = ?', [id])
    return (rows as Produit) || null
  }

  static async create(produit: Produit): Promise<number> {
    const { nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, id_t_categorie, image_url} = produit
    const [result]: any = await db.query(
      'INSERT INTO t_produit (nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, id_t_categorie, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, id_t_categorie, image_url],
    )
    return result.insertId
  }

  static async update(id: number, produit: Produit): Promise<void> {
    const { nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, id_t_categorie, image_url } = produit
    await db.query(
      'UPDATE t_produit SET nom_produit = ?, description = ?, forme = ?, dosage = ?, prix = ?, laboratoire_fabriquant = ?, id_t_categorie = ?, image_url = ? WHERE id_t_produit = ?',
      [nom_produit, description, forme, dosage, prix, laboratoire_fabriquant , id_t_categorie, image_url, id],
    )
  }

  static async delete(id: number): Promise<void> {
    await db.query('DELETE FROM t_produit WHERE id_t_produit = ?', [id])
  }
}
