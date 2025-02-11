import React from 'react'

export interface User {
  id_t_user: number
  name_t_user: string
  adminAproved: boolean
}

interface UserRowProps {
  user: User
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
  return (
    <tr key={user.id_t_user}>
      {/* <td>{user.id_t_user}</td>
      <td>{user.nom_produit}</td>
      <td>{user.prix}€</td>
      <td>{user.adminAproved}</td> */}

      <td>{user.id_t_user}</td>
      <td>{user.name_t_user}</td>
      <td>{user.adminAproved ? '✅' : '❌'}</td>

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
