import { useEffect, useState } from 'react'
import Card from '../component/Card'
import { Produit } from '../types' // Importez le type Produit

function NosProduits() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [messageSucces, setMessageSucces] = useState<string | null>(null) // État pour le message de succès
  const [selectedForme, setSelectedForme] = useState<string>('tout') // Etat pour le filtre

  useEffect(() => {
    const getProduits = async () => {
      try {
        const token = localStorage.getItem('authToken')

        const url =
          selectedForme === 'tout'
            ? 'http://localhost:3000/api/produits'
            : 'http://localhost:3000/api/produits?forme=${selectedForme}'

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

        const data: Produit[] = await response.json()
        setProduits(data)
      } catch (error) {
        console.error('Erreur de requête:', error)
      }
    }

    getProduits()
  }, [selectedForme])

  function addToPanier(produit: Produit) {
    const storedPanier = localStorage.getItem('panier')
    const panier: Produit[] = storedPanier ? JSON.parse(storedPanier) : []
    panier.push(produit)
    localStorage.setItem('panier', JSON.stringify(panier))

    // Afficher un message de succès
    setMessageSucces(`${produit.nom_produit} a été ajouté au panier !`)
    setTimeout(() => setMessageSucces(null), 3000) // Effacer le message après 3 secondes
  }

  return (
    <>
      {messageSucces && (
        <div
          style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}
        >
          {messageSucces}
        </div>
      )}

      <div className="flex justify-center mb-3">
        <select
          value={selectedForme}
          onChange={e => setSelectedForme(e.target.value)}
          className="p-2 border border-grey-300 rounded-md"
        >
          <option value={'tout'}>Tout</option>
          <option value={'dermique'}>dermique</option>
          <option value={'injectable'}>injectable</option>
          <option value={'médicamenteuse'}>médicamenteuse</option>
        </select>
      </div>

      {produits.length === 0 ? (
        <p>Requête produit...</p>
      ) : (
        <Card produits={produits} addToPanier={addToPanier} />
      )}
    </>
  )
}

export default NosProduits
