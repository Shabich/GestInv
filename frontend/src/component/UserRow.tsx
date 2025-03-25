import React, { useState } from 'react'

export interface User {
  id_t_user: number
  nom: string
  prenom: string
  adresse_mail: string
  admin: boolean
}

interface UserRowProps {
  user: User
  index: number
  onRoleChange: (id: number, newRole: boolean) => void
  onDelete: (id: number) => void // Add onDelete prop
}

const UserRow: React.FC<UserRowProps> = ({ 
  user, 
  index, 
  onRoleChange, 
  onDelete // Destructure the onDelete prop
}) => {
  const isEven = index % 2 === 0
  const [isAdmin, setIsAdmin] = useState(user.admin)

  const handleRoleChange = async () => {
    const newRole = !isAdmin
    setIsAdmin(newRole) // Mise à jour optimiste
    onRoleChange(user.id_t_user, newRole) // Appelle la fonction pour envoyer la requête API
  }

  return (
    <tr style={{ backgroundColor: isEven ? '#cce3ff' : 'transparent' }}>
      <td>{user.id_t_user}</td>
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.adresse_mail}</td>
      <td>
        <input type="checkbox" checked={isAdmin} onChange={handleRoleChange} />
      </td>
      <td>
        <button onClick={() => onDelete(user.id_t_user)} style={{ marginLeft: '5px' }}>
          Supprimer
        </button>
      </td>
    </tr>
  )
}

export default UserRow
