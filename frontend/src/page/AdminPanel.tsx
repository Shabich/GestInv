import React, { useEffect, useState } from 'react'
import ProductsPanel from '../component/ProductPanel'
import UsersPanel from '../component/UsersPanel'
import { Product } from '../component/ProductPanel'
import { User } from '../component/UsersPanel'

// const ProductsPanel: React.FC<{
//   products: Product[]
//   isLoading: boolean
//   error: string | null
// }> = ({ products, isLoading, error }) => (
//   <div>
//     <h2>Produits</h2>
//     {isLoading && <p>Chargement...</p>}
//     {error && <p style={{ color: 'red' }}>{error}</p>}
//     {!isLoading && !error && (
//       <table border={1} style={{ width: '100%', textAlign: 'left' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nom</th>
//             <th>Prix</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id_t_produit}>
//               <td>{product.id_t_produit}</td>
//               <td>{product.nom_produit}</td>
//               <td>{product.prix}€</td>
//               <td>{product.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// )

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const token = localStorage.getItem('authToken')

  const fetchData = async (url: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
    if (!token) {
      setError("Aucun token trouvé, vous n'êtes pas authentifié.")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Problème avec la requête')
      }

      const data = await response.json()
      setData(data)
    } catch (err) {
      console.error('Erreur detectée', err)
      setError('Erreur lors du chargement des données')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData('http://localhost:3000/api/users', setUsers)
    fetchData('http://localhost:3000/api/produits', setProducts)
  }, [token])

  return (
    <div>
      <h1>Panneau d'administration</h1>
      <UsersPanel users={users} isLoading={isLoading} error={error} />
      <ProductsPanel products={products} isLoading={isLoading} error={error} />
    </div>
  )
}

export default AdminPanel
