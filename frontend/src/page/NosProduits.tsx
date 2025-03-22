import { useEffect, useState } from 'react';
import Card from '../component/Card';
import { Categorie, Produit } from '../types';

function NosProduits() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [messageSucces, setMessageSucces] = useState<string | null>(null);
  const [categorie, setCategorie] = useState<Categorie[]>([]);
  const [categorieActive, setCategorieActive] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getProduits();
    getCategories();
  }, []);

  const getProduits = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const url = 'http://localhost:3000/api/produits';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Problème avec la requête');
      }

      const data: Produit[] = await response.json();
      setProduits(data);
      setCategorieActive(null);
    } catch (error) {
      console.error('Erreur de requête:', error);
    }
  };

  const getCategories = async () => {
    try {
      const url = 'http://localhost:3000/api/produits/categorie';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Problème avec la requête');
      }

      const data = await response.json();
      setCategorie(data);
    } catch (error) {
      console.error('Erreur de requête:', error);
    }
  };

  const addToPanier = (produit: Produit) => {
    const storedPanier = localStorage.getItem('panier');
    const panier: Produit[] = storedPanier ? JSON.parse(storedPanier) : [];
    panier.push(produit);
    localStorage.setItem('panier', JSON.stringify(panier));

    setMessageSucces(`${produit.nom_produit} a été ajouté au panier !`);
    setTimeout(() => setMessageSucces(null), 3000);
  };

  const getAppCate = async (id: number) => {
    try {
      const url = `http://localhost:3000/api/produits/categorie/${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Problème avec la requête');
      }

      const data = await response.json();
      setProduits(data);
      setCategorieActive(id);
    } catch (error) {
      console.error('Erreur de requête:', error);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      try {
        const url = `http://localhost:3000/api/produits/search/${value}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Problème avec la requête');
        }
        const data = await response.json();
        setProduits(data);
        setCategorieActive(0);
      } catch (error) {
        console.error('Erreur de requête:', error);
      }
    } else {
      getProduits();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[10px] px-2">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 m-2 w-1/3"
        />

        <nav className="justify-start border-white border-b-blue border-[2px] mx-xl py-2">
          <button
            onClick={() => getProduits()}
            className={`p-2 px-3 duration-500 px-[10px] rounded-sm ${categorieActive === null ? 'bg-blue text-white' : 'text-black'}`}
          >
            Tout voir
          </button>
          {categorie.map((cate) => (
            <button
              key={cate.id_t_categorie}
              onClick={() => getAppCate(cate.id_t_categorie)}
              className={`p-2 px-3 duration-500 px-[10px] text-white rounded-sm duration-500 bg-clearBlue hover:bg-black px-[10px] ${categorieActive === cate.id_t_categorie ? 'bg-blue' : ''}`}
            >
              {cate.lib_court}
            </button>
          ))}
        </nav>

        <div className="h-[20px]">
          {messageSucces && (
            <div
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              {messageSucces}
            </div>
          )}
        </div>

        <div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
  gap: '16px'
}}>
  {produits.length === 0 ? (
    <p>Requête produit...</p>
  ) : (
    produits.map((produit) => (
      <Card key={produit.id_t_produit} produit={produit} addToPanier={addToPanier} />
    ))
  )}
</div>

      </div>
    </>
  );
}

export default NosProduits;