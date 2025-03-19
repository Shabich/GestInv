import db from '../config/db'
import { Pharmacie } from './pharmacie.interfaces'

export class pharmacieService {
  static async getAll(): Promise<Pharmacie[]> {
    const [rows] = await db.query('SELECT * FROM t_pharmacie')
    return rows as Pharmacie[]
  }
  static async getById(id: number) {
    const [rows]: any = await db.query(
      `
      SELECT 
      * FROM t_pharmacie
      WHERE id_t_pharmacie = ? 
`,
      [id],
    )
    return (rows as Pharmacie) || null
  }
  static async create(pharmacie: Pharmacie) {
    const { ville, adresse, region, departement, numero_telephone, lib_court, lib_long } = pharmacie;
    const [result]: any = await db.query(
      `INSERT INTO t_pharmacie (ville, adresse, region, departement, numero_telephone, lib_court, lib_long) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ville, adresse, region, departement, numero_telephone, lib_court, lib_long]
    );
    return { id: result.insertId, message: 'Pharmacie ajoutée avec succès' };
  }

  static async update(id: number, pharmacie: Pharmacie) {
    const { ville, adresse, region, departement, numero_telephone, lib_court, lib_long } = pharmacie;
    const [result]: any = await db.query(
      `UPDATE t_pharmacie SET ville = ?, adresse = ?, region = ?, departement = ?, numero_telephone = ?, lib_court = ?, lib_long = ? 
       WHERE id_t_pharmacie = ?`,
      [ville, adresse, region, departement, numero_telephone, lib_court, lib_long, id]
    );
    return result.affectedRows > 0 ? { message: 'Pharmacie mise à jour avec succès' } : null;
  }

  static async delete(id: number) {
    const [result]: any = await db.query(
      `DELETE FROM t_pharmacie WHERE id_t_pharmacie = ?`,
      [id]
    );
    return result.affectedRows > 0 ? { message: 'Pharmacie supprimée avec succès' } : null;
  }


}


// à partir de l'interface suivante, faire les routes CREATE, PUT et DELETE. export interface Pharmacie {
  //   id_t_pharmacie?: number;
  //   ville: string;
  //   adresse: string;
  //   region: string;
  //   departement: string;
  //   numero_telephone: number;
  //   lib_court: string;
  //   lib_long: string;
  // }
  