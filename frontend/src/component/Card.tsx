type CardProps = {
  produits: {
    id: number;
    nom_produit: string;
    prix: number;
    description: string;
    forme: string;
    dosage: string;
    laboratoire_fabriquant: string;
    image_url?: string;
    restrictions: string;
  }[]; 
};

const Card = ({ produits }: CardProps) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
      }}
    >
      {produits.map((produit) => (
        <div
          key={produit.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {/* Image produit */}
          {produit.image_url && (
            <img
              src={produit.image_url}
              alt={produit.nom_produit}
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
            {produit.nom_produit}
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            {produit.description}
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            <strong>Restrictions:</strong> {produit.restrictions}
          </p>

          <div style={{ marginBottom: '10px' }}>
            <strong>Prix:</strong> <span>{produit.prix}€</span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Forme:</strong> <span>{produit.forme}</span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Dosage:</strong> <span>{produit.dosage}</span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Laboratoire:</strong> <span>{produit.laboratoire_fabriquant}</span>
          </div>

          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={() => alert(`Acheter ${produit.nom_produit}`)}
          >
            Acheter
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
// type Product = {
//     id: number;
//     nom_produit: string;
//     prix: number;
//     description: string;
//     forme: string;
//     dosage: string;
//     laboratoire_fabriquant: string;
//     image_url?: string;
//     restrictions: string;
// };


// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 shadow-lg">
//       {product.image_url ? (
//         <img
//           src={product.image_url} // Utilise image_url pour l'URL de l'image
//           alt={product.nom_produit} // Correspond au nom du produit
//           width={200}
//           height={200}
//           className="product-image"
//         />
//       ) : (
//         <div className="product-image-placeholder">
//           {/* Placeholder si aucune image n'est disponible */}
//           Image non disponible
//         </div>
//       )}
//       <h3 className="product-name">{product.nom_produit}</h3>
//       <p className="product-description">{product.description}</p>
//       <p className="product-price">{product.prix} €</p>
//     </div>
//   );
// }