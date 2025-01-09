import { useEffect, useState } from 'react';
import { Produit } from '../types'; // Importez le type Produit

function Panier() {
  const [panier, setPanier] = useState<Produit[]>([]);

  useEffect(() => {
    const storedPanier = localStorage.getItem('panier');
    if (storedPanier) {
      setPanier(JSON.parse(storedPanier));
    }
  }, []);

   function removeFromPanier(productId: number){
    const updatedPanier = panier.filter((item) => item.id !== productId);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Votre Panier</h1>
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {panier.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                width: '300px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
              }}
            >
              { (
                <img
                  src={item.image_url}
                  alt="aucune image existante"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '15px',
                  }}
                />
              )}
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                {item.nom_produit}
              </h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                {item.description}
              </p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                <strong>Prix:</strong> {item.prix}€
              </p>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onClick={() => removeFromPanier(item.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Panier;