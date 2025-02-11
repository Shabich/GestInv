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

  // static async create(produit: Users): Promise<number> {
  //   const { nom_produit, description, forme, dosage, prix, laboratoire_fabriquant } = produit;
  //   const [result]: any = await db.query(
  //     'INSERT INTO t_produit (nom_produit, description, forme, dosage, prix, laboratoire_fabriquant) VALUES (?, ?, ?, ?, ?, ?)',
  //     [nom_produit, description, forme, dosage, prix, laboratoire_fabriquant]
  //   );
  //   return result.insertId;
  // }

  static async update(id: number, user: Users): Promise<void> {
    const { adminAproved } = user
    await db.query('UPDATE t_user SET adminAproved = 1', [adminAproved])
  }

  static async delete(id: number): Promise<void> {
    await db.query('DELETE FROM t_user WHERE id_t_user = ?', [id])
  }
}
