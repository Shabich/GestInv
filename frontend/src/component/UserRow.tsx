import React from 'react'

export interface User {
  id_t_user: number
  nom: string
  prenom: string
  admin: boolean
}
const UserRow: React.FC<any> = ({ user, onEdit, onDelete }) => {
  return (
    <tr key={user.id_t_user}>
      <td>{user.id_t_user}</td>
      <td>{user.nom + " " + user.prenom}</td>
      <td>{user.admin ? '✅' : '❌'}</td>

      <td>
        <button onClick={() => onEdit(user.id_t_user)}>Modifier</button>
        <button onClick={() => onDelete(user.id_t_user)} style={{ marginLeft: '5px' }}>
          Supprimer
        </button>
      </td>
    </tr>
  )
}

export default UserRow
