import { useEffect, useState } from 'react';
import { Produit } from '../types';
import {jwtDecode} from "jwt-decode";


function Panier() {
  const [panier, setPanier] = useState<Produit[]>([]);
  
  useEffect(() => {
    const storedPanier = localStorage.getItem('panier');

    if (storedPanier) {
      const parsedPanier: Produit[] = JSON.parse(storedPanier);
    
      const mergedPanier = Object.values(
        parsedPanier.reduce((acc: Record<string, Produit>, item: Produit) => {
          if (acc[item.id_t_produit]) {
            acc[item.id_t_produit].quantité += item.quantité || 1;
          } else {
            acc[item.id_t_produit] = { ...item, quantité: item.quantité || 1 };
          }
          return acc;
        }, {})
      );
    
      setPanier(mergedPanier);
      console.log(mergedPanier, storedPanier, "panier");
    }
    
  }, []);



  const purchasePanier = () => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
          console.error("Aucun token trouvé dans le localStorage.");
          return;
      }
  
      console.log("Token récupéré :", token);
  
      try {
          // Décoder le token sans vérification de signature
          const decoded: any = jwtDecode(token);
  
          console.log("Token décodé :", decoded);
  
          if (decoded.id) {
              console.log("ID de l'utilisateur :", decoded.id);
              return decoded.id;
          } else {
              console.error("L'ID de l'utilisateur est introuvable dans le token.");
          }
      } catch (err) {
          console.error("Erreur lors du décodage du token :", err);
      }
  };
  


  const removeFromPanier = (productId: number) => {
    const updatedPanier = panier.filter(
      (item) => item.id_t_produit !== productId
    );
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const updateQuantité = (productId: number, quantité: number) => {
    const updatedPanier = panier.map((item) =>
      item.id_t_produit === productId
        ? { ...item, quantité: Math.max(1, quantité) }
        : item
    );
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  // Calcul du sous-total, des frais de livraison, des taxes et du total
  const sousTotal = panier.reduce(
    (total, item) => total + item.prix * item.quantité,
    0
  );
  const fraisLivraison = 5.0;
  const taxes = sousTotal * 0.07;
  const total = sousTotal + fraisLivraison + taxes;

  // ---------- STYLES RESPONSIVE ----------
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  // Conteneur qui inclut la liste des produits et le récapitulatif
  // Utilise flex-wrap pour passer à la ligne suivante sur petits écrans
  const columnsWrapperStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',    // Permet de faire passer la deuxième colonne en dessous si l’écran est trop petit
  };

  // Colonne des produits
  const productsColumnStyle: React.CSSProperties = {
    flex: 2,
    minWidth: '300px',   // Largeur minimum pour éviter que la colonne ne devienne trop étroite
  };

  // Colonne du récapitulatif
  const recapColumnStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '280px',   // Largeur minimum pour le récapitulatif
    maxHeight: 'fit-content', // Empêche d’avoir une trop grande hauteur sur petits écrans
  };

  // Style des cartes produits
  const productCardStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    flexWrap: 'wrap', 
  };

  // Style de l'image produit (responsive)
  const productImageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '120px',  // Largeur max fixée, mais 100% sinon
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  };

   
  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Votre Panier
      </h1>

      <div style={columnsWrapperStyle}>
        {/* Colonne des produits */}
        <div style={productsColumnStyle}>
          {panier.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {panier.map((item) => (
                <div key={item.id_t_produit} style={productCardStyle}>
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.nom_produit}
                      style={productImageStyle}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                      }}
                    >
                      {item.nom_produit}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '10px',
                      }}
                    >
                      {item.description}
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '10px',
                      }}
                    >
                      <strong>Prix: </strong> {item.prix}€
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantité(item.id_t_produit, item.quantité - 1)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        -
                      </button>
                      <span style={{ margin: '0 10px', fontSize: '16px' }}>
                        {item.quantité}
                      </span>
                      <button
                        onClick={() => updateQuantité(item.id_t_produit, item.quantité + 1)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        +
                      </button>
                    </div>
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
        {panier.length === 0 ? (
            ''
          ) : (
        <div style={recapColumnStyle}>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              Récapitulatif de la commande
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Sous-total
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {sousTotal.toFixed(2)}€
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Frais de livraison
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {fraisLivraison.toFixed(2)}€
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#666' }}>Taxes</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {taxes.toFixed(2)}€
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Total
                </span>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {total.toFixed(2)}€
                </span>
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
              onClick={purchasePanier}
            >
              Passer la commande
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
    
  );
}

export default Panier;
