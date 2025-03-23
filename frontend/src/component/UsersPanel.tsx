import React, { useEffect, useState } from 'react'
import UserRow from '../component/UserRow'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api'

const UsersPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [messageSucces, setMessageSucces] = useState<string | null>(null) // État pour le message de succès

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
      const data = await apiFetch<User[]>('/users')
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
      const response: Response = await apiFetch(`/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response) {
        console.error('Réponse complète du serveur :')
        throw new Error('Erreur lors de la suppression')
      }

      setUsers(prev => prev.filter(user => user.id_t_user !== id))
      setMessageSucces('User supprimé avec succès')
      setTimeout(() => setMessageSucces(null), 3000)
    } catch (err) {
      console.error('Erreur lors de la suppression :', err)
      alert('Erreur lors de la suppression du user')
    }
  }

  return (
    <div>
      {messageSucces && (
        <div
          style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}
        >
          {messageSucces}
        </div>
      )}
      {isLoading && <p>Chargement des users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {error && <button onClick={handleLogout}>Veuillez vous reconnecter</button>}

      {!isLoading && !error && (
        <table border={1} style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Adresse mail</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow
                key={user.id_t_user}
                user={user}
                index={index}
                onDelete={() => handleDelete(user.id_t_user)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UsersPanel
