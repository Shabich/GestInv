import { Produit } from '../types' // Importez le type Produit

type CardProps = {
  produits: Produit[] // Un tableau de Produit
  addToPanier: (produit: Produit) => void // Une fonction pour ajouter au panier
}

const Card = ({ produits, addToPanier }: CardProps) => {
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
      {produits.map(produit => (
        <div
          // key={produit.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 1px #ddd',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            transition: 'transform 0.3s ease-in-out',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="flex flex-col justify-center items-center">
              {produit.image_url && (
                <img
                  src={produit.image_url}
                  alt={produit.nom_produit}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '15px',
                  }}
                />
              )}
            </div>

            <h3 style={{ fontSize: '139%', fontWeight: 'bold', marginBottom: '10px' }}>
              {produit.nom_produit} - {produit.dosage}
            </h3>

            <div style={{ marginBottom: '10px', color: '#666' }}>
              <strong>Laboratoire:</strong> <span>{produit.laboratoire_fabriquant}</span>
            </div>

            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              <strong>Restrictions:</strong> {produit.restrictions}
            </p>

            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {produit.description}
            </p>
          </div>

          <div>
            <div style={{ marginBottom: '10px', color: 'black', fontSize: '200%' }}>
              <strong>{produit.prix}€</strong>
            </div>

            <button
              className="hover:bg-darkBlue"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                bottom: '0',
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#0667cf')}
              onMouseLeave={e => (e.target.style.backgroundColor = '#007BFF')}
              onClick={() => addToPanier(produit)} // Ajouter le produit au panier
            >
              Acheter
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
