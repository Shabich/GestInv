import { useEffect, useState } from 'react';
import { Produit } from '../types'; // Importez le type Produit

function Panier() {
  const [panier, setPanier] = useState<Produit[]>([]);

  useEffect(() => {
    const storedPanier = localStorage.getItem('panier');
    if (storedPanier) {
      setPanier(JSON.parse(storedPanier)); // Initialiser l'état avec les données du localStorage
    }
  }, []);

  const removeFromPanier = (productId: number) => {
    const updatedPanier = panier.filter((item) => item.id_t_produit !== productId); // Filtrer par id_t_produit
    setPanier(updatedPanier); // Mettre à jour l'état
    localStorage.setItem('panier', JSON.stringify(updatedPanier)); // Mettre à jour le localStorage
  };

  // Calcul du sous-total, des frais de livraison, des taxes et du total
  const sousTotal = panier.reduce((total, item) => total + item.prix, 0);
  const fraisLivraison = 5.0; // Frais de livraison fixes
  const taxes = sousTotal * 0.07; // Exemple de taxe de 7%
  const total = sousTotal + fraisLivraison + taxes;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Votre Panier</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Colonne des produits */}
        <div style={{ flex: 2 }}>
          {panier.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {panier.map((item) => (
                <div
                  key={item.id_t_produit}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#fff',
                  }}
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.nom_produit}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
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
                        padding: '8px 16px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                      onClick={() => removeFromPanier(item.id_t_produit)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne du récapitulatif de la commande */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Récapitulatif de la commande
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Sous-total</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{Number(sousTotal).toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Frais de livraison</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{fraisLivraison.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Taxes</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{taxes.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Total</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{Number(total).toFixed(2)}€</span>
              </div>
            </div>

            <button
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panier;