import React from 'react'

export interface User {
  id_t_user: number
  nom: string
  prenom: string
  adresse_mail: string
  admin: boolean
}

const UserRow: React.FC<{ user: User; index: number; onDelete: (id: number) => void }> = ({ user, index, onDelete }) => {
  const isEven = index % 2 === 0

  return (
    <tr style={{ backgroundColor: isEven ? '#f0f0f0' : 'transparent' }}>
      <td>{user.id_t_user}</td>
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.adresse_mail}</td>
      <td>{user.admin ? '✅' : '❌'}</td>
      <td>
        <button onClick={() => onDelete(user.id_t_user)} style={{ marginLeft: '5px' }}>
          Supprimer
        </button>
      </td>
    </tr>
  )
}

export default UserRow
