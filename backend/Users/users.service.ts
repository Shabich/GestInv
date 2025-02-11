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

  static async update(user: Users): Promise<void> {
    await db.query('UPDATE t_user SET adminAproved = ? WHERE id = ?', [user.admin, user.id_t_user])
  }

  static async delete(id: number): Promise<void> {
    await db.query('DELETE FROM t_user WHERE id_t_user = ?', [id])
  }
}
