import React, { useEffect, useState } from 'react'
import UserRow from '../component/UserRow'
import UserForm from './UserForm'
import { useNavigate } from 'react-router-dom'

export interface User {
  id_t_user: number
  name_t_user: string
  adminAproved: boolean
}

const UsersPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [idEdit, setId] = useState<number | null>(null)

  // Récupérer le token
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  const getUsers = async () => {
    if (!token) {
      setError("Aucun token trouvé, vous n'êtes pas authentifié.")
      setIsLoading(false)
      return
    }

    setIsLoading(true) // Démarrage du chargement
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Réponse complète du serveur :', errorText)
        throw new Error('Problème avec la requête')
      }

      const data = await response.json()
      console.log('Users récupérés :', data)
      setUsers(data)
    } catch (err) {
      console.error('Erreur de requête :', err)
      setError('Erreur lors du chargement des users')

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [token])

  const handleClickOpen = (id: number | null) => {
    setId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    getUsers() 
  }


  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le user avec l'ID: ${id}?`,
    )
    if (!confirmDelete) return

    if (!token) {
      alert("Token introuvable, vous n'êtes pas authentifié.")
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Réponse complète du serveur :', errorText)
        throw new Error('Erreur lors de la suppression')
      }

      setUsers(prev => prev.filter(user => user.id_t_user !== id))
      alert('User supprimé')
    } catch (err) {
      console.error('Erreur lors de la suppression :', err)
      alert('Erreur lors de la suppression du user')
    }
  }

  return (

    <div>
      {isLoading && <p>Chargement des users...</p>}
      {error && <p style={{ color: 'red' }}>{error} 
      </p>}
      {
      // error && 
      <button onClick={handleLogout}>Veuillez vous reconnecter</button>}


      {!isLoading && !error && (
        <table border={1} style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow
                key={user.id_t_user}
                user={user}
                onEdit={() => handleClickOpen(user.id_t_user)}
                onDelete={() => handleDelete(user.id_t_user)}
              />
            ))}
          </tbody>
        </table>
      )}
      <UserForm
        id={idEdit}
        open={open}
        handleClose={handleClose}
        reloadUsers={getUsers} // Ajout de la propriété `reloadProduits`

        />
    </div>
  )
}

export default UsersPanel
