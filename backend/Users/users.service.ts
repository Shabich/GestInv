import db from '../config/db'
import { Users } from './users.interfaces'

export class UsersService {
  static async getAll(): Promise<Users[]> {
    const [rows] = await db.query('SELECT * FROM t_user')
    return rows as Users[]
  }

  static async getById(id: number): Promise<Users | null> {
    const [rows]: any = await db.query('SELECT * FROM t_user WHERE id_t_user = ?', [id])
    return (rows[0] as Users) || null
  }

  static async update(user: Users, id: number): Promise<void> {
    const {nom,prenom,adresse_mail,adresse,num_tel,date_naissance,id_t_rappel,admin } = user;
    const formatted_date_naissance = date_naissance 
    ? new Date(date_naissance).toISOString().slice(0, 10) 
    : null;
    if (!id) {
      throw new Error("L'ID de l'utilisateur est requis pour la mise à jour.");
    }
      await db.query(
      'UPDATE t_user SET nom = ?,prenom = ?,adresse_mail = ?,adresse = ?,num_tel = ?,date_naissance = ?,id_t_rappel = ?,admin = ? WHERE id_t_user = ?', 
      [nom,prenom,adresse_mail,adresse,num_tel,formatted_date_naissance,id_t_rappel,admin,id]
    )
  }

  static async delete(id: number): Promise<void> {
    await db.query('DELETE FROM t_user WHERE id_t_user = ?', [id])
  }
}
