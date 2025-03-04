import { useEffect, useState } from 'react'
import Card from '../component/Card'
import { Categorie, Produit } from '../types'

function NosProduits() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [messageSucces, setMessageSucces] = useState<string | null>(null)
  const [categorie, setCategorie] = useState<Categorie[]>([])
  const [categorieActive, setCategorieActive] = useState<number | null>(null)

  useEffect(() => {
    getProduits()
    getCategories()
  }, [])

  const getProduits = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const url = 'http://localhost:3000/api/produits'

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
      setCategorieActive(null)
    } catch (error) {
      console.error('Erreur de requête:', error)
    }
  }

  const getCategories = async () => {
    try {
      const url = 'http://localhost:3000/api/produits/categorie'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Problème avec la requête')
      }

      const data = await response.json()
      setCategorie(data)
    } catch (error) {
      console.error('Erreur de requête:', error)
    }
  }

  function addToPanier(produit: Produit) {
    const storedPanier = localStorage.getItem('panier')
    const panier: Produit[] = storedPanier ? JSON.parse(storedPanier) : []
    panier.push(produit)
    localStorage.setItem('panier', JSON.stringify(panier))

    setMessageSucces(`${produit.nom_produit} a été ajouté au panier !`)
    setTimeout(() => setMessageSucces(null), 3000)
  }

  async function getAppCate(id: number) {
    try {
      const url = `http://localhost:3000/api/produits/categorie/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Problème avec la requête')
      }

      const data = await response.json()
      setProduits(data)
      setCategorieActive(id)
    } catch (error) {
      console.error('Erreur de requête:', error)
    }
  }

  return (
    <>
      {messageSucces && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>
          {messageSucces}
        </div>
      )}
      <nav className="justify-start" style={{ backgroundColor: '#007BFF', color: 'white' }}>
        <button
          onClick={() => getProduits()}
          className={`duration-500 px-[10px] ${categorieActive === null ? 'bg-black' : ''}`}
        >
          Tout voir
        </button>
        {categorie.map((cate) => (
          <button
            key={cate.id_t_categorie}
            onClick={() => getAppCate(cate.id_t_categorie)}
            className={`duration-500 hover:bg-black px-[10px] ${categorieActive === cate.id_t_categorie ? 'bg-black' : ''}`}
          >
            {cate.lib_court}
          </button>
        ))}
      </nav>

      {produits.length === 0 ? (
        <p>Requête produit...</p>
      ) : (
        <Card produits={produits} addToPanier={addToPanier} />
      )}
    </>
  )
}

export default NosProduits
