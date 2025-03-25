import React, { useEffect, useState } from 'react'
import ProductRow from '../component/ProductRow'
import FormDialog from '../component/ProductForm'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api'

export interface Product {
  id_t_produit: number
  nom_produit: string
  prix: number
  description: string
}

const ProductsPanel: React.FC = () => {
  const [produits, setProduits] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [idEdit, setId] = useState<number | null>(null)
  const [messageSucces, setMessageSucces] = useState<string | null>(null); // État pour le message de succès

  // Récupérer le token
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  // Fonction pour récupérer les produits
  const getProduits = async () => {
    if (!token) {
      setError("Aucun token trouvé, vous n'êtes pas authentifié.")
      setIsLoading(false)
      return
    }

    setIsLoading(true) // Démarrage du chargement
    try {
      const data = await apiFetch<Product[]>('/produits')
      console.log('Produits récupérés :', data) // Ajout de log pour inspection
      setProduits(data)
    } catch (err) {
      console.error('Erreur de requête :', err)
      setError('Erreur lors du chargement des produits')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProduits()
  }, [token])

  const handleClickOpen = (id: number | null) => {
    setId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    getProduits() // Rafraîchir les produits après fermeture
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le produit avec l'ID: ${id}?`,
    )
    if (!confirmDelete) return

    if (!token) {
      alert("Token introuvable, vous n'êtes pas authentifié.")
      return
    }

    try {
      const response: Response= await apiFetch(`/produits/${id}`, {
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

      setProduits(prev => prev.filter(produit => produit.id_t_produit !== id))
      setMessageSucces('Le produit a été supprimé');
      setTimeout(() => setMessageSucces(null), 3000); 


    } catch (err) {
      console.error('Erreur lors de la suppression :', err)
      alert('Erreur lors de la suppression du produit')
    }
  }

  const handleCreate = () => {
    handleClickOpen(null) // Aucun ID pour indiquer une création
  }

  return (
    <div>
      {messageSucces && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>
          {messageSucces}
        </div>
      )}
      <button
        onClick={handleCreate}
        style={{ marginBottom: '10px', background: '#367ff5', color: 'white', padding: '3px' }}
      >
        Créer Produit
      </button>
      {isLoading && <p>Chargement des produits...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {error && <button style={{ marginBottom: '10px', background: '#FF0000', color: 'white', padding: '3px' }} onClick={handleLogout}>Veuillez vous reconnecter</button>}
      {!isLoading && !error && (
        <table border={1} style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <ProductRow
                key={produit.id_t_produit}
                produit={produit}
                onEdit={() => handleClickOpen(produit.id_t_produit)}
                onDelete={() => handleDelete(produit.id_t_produit)}
                index={index}

              />
            ))}
          </tbody>
        </table>
      )}
      <FormDialog
        id={idEdit}
        open={open}
        handleClose={handleClose}
        reloadProduits={getProduits} // Ajout de la propriété `reloadProduits`
      />
    </div>
  )
}

export default ProductsPanel
