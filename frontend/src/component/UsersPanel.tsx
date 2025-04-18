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

  const updateUserRole = async (userId: number, newRole: boolean) => {
    if (!token) {
      console.error('Aucun token trouvé')
      return
    }

    try {
      await apiFetch(`/users/role/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin: newRole }),
      })
      console.log(`Utilisateur ${userId} mis à jour avec succès`)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle de l’utilisateur:', error)
    }
  }

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
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
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
                user={{
                  ...user,
                  adresse_mail: user.adresse_mail ?? '',
                  nom: user.nom ?? '',
                  prenom: user.prenom ?? '',
                  admin: Boolean(user.admin), // Convertit 1 ou 0 en true ou false
                }}
                index={index}
                onRoleChange={updateUserRole}
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
