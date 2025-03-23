import { useEffect, useState } from 'react';
import Card from '../component/Card';
import { Categorie, Produit } from '../types';
import { apiFetch } from '../utils/api';

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
      const data = await apiFetch<Produit[]>('/produits');

      setProduits(data);
      setCategorieActive(null);
    } catch (error) {
      console.error('Erreur de requête:', error);
    }
  };

  const getCategories = async () => {
    try {
      const cate = await apiFetch<Categorie[]>('/produits/categorie');
      setCategorie(cate);
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
      const data = await apiFetch<Produit[]>(`/produits/categorie/${id}`);
      setProduits(data);
      setCategorieActive(id);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits par catégorie:', error);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      try {
        const data = await apiFetch<Produit[]>(`/produits/search/${value}`);
        setProduits(data);
        setCategorieActive(0);
      } catch (error) {
        console.error('Erreur lors de la recherche des produits:', error);
      }
    } else {
      getProduits();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[10px] px-2"
       style={{ marginTop:'10px'
      }}>
        {/* Conteneur flex pour les catégories et la barre de recherche */}
        <div className="flex justify-between items-center">
          {/* Navigation des catégories */}
          <nav className="flex gap-2">
            <button
              onClick={() => getProduits()}
              className={`p-2 px-3 rounded-sm ${categorieActive === null ? 'bg-blue text-white' : 'text-black'}`}
            >
              Tout voir
            </button>
            {categorie.map((cate) => (
              <button
                key={cate.id_t_categorie}
                onClick={() => getAppCate(cate.id_t_categorie)}
                className={`p-2 px-3 text-white rounded-sm bg-clearBlue hover:bg-black ${categorieActive === cate.id_t_categorie ? 'bg-blue' : ''}`}
              >
                {cate.lib_court}
              </button>
            ))}
          </nav>

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 w-1/3 ml-4"
          />
        </div>

        {/* Message de succès */}
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

        {/* Affichage des produits */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
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
