import db from '../config/db'
import { Commande } from './commande.interfaces'

export class CommandeService {
  static async getAll(): Promise<Commande[]> {
    const [rows] = await db.query('SELECT * FROM t_commande')
    return rows as Commande[]
  }
  static async getByUserId(id: number){
    console.log('aaa')
    const [rows]: any = await db.query(`
      SELECT 
      c.id_t_commande, 
      c.date_commande, 
      c.statut, 
      c.total, 
      c.id_t_user, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id_t_produit', p.id_t_produit, 
          'quantite', cp.quantite, 
          'nom_produit', p.nom_produit, 
          'prix', p.prix, 
          'laboratoire_fabriquant', p.laboratoire_fabriquant, 
          'image_url', p.image_url
        )
      ) AS produits 
      FROM t_commande c 
      JOIN tj_commande_produit cp ON c.id_t_commande = cp.id_t_commande 
      JOIN t_produit p ON cp.id_t_produit = p.id_t_produit 
      WHERE c.id_t_user = ? 
      GROUP BY c.id_t_commande, c.date_commande, c.statut, c.total, c.id_t_user;
`, [id]);







        return (rows as Commande) || null

  }
}