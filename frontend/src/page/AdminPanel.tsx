import React, { useEffect, useState } from 'react';
import ProductRow from '../component/ProductRow'; // Ajustez le chemin si nécessaire

interface Produit {
  id_t_produit: number;
  nom_produit: string;
  description: string;
  prix: number;
}

const ProduitsTable: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduits = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/produits');
        if (!response.ok) {
          throw new Error('Problème avec la requête');
        }
        const data = await response.json();
        setProduits(data);
      } catch (error) {
        setError('Erreur lors du chargement des produits');
        console.error('Erreur de requête:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduits();
  }, []);

  const handleEdit = (id: number) => {
    alert(`Modifier le produit avec ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le produit avec l'ID: ${id}?`
    );
    if (confirmDelete) {
      const del = fetch('http://localhost:3000/api/produits/' + id, {
        method: 'DELETE',
      })
      if(del){
        return del
      }
      setProduits((prevProduits) => prevProduits.filter((produit) => produit.id_t_produit !== id));
      alert('Produit supprimé');
    }
  };

  const handleCreate = () => {
    alert('Créer un nouveau produit (fonctionnalité à implémenter)');
  };

  return (
    <div>
      <h1>Produits</h1>
      <button onClick={handleCreate} style={{ marginBottom: '10px' }}>
        Créer Produit
      </button>
      {isLoading && <p>Chargement des produits...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
            {produits.map((produit) => (
              <ProductRow
                key={produit.id_t_produit}
                produit={produit}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProduitsTable;
