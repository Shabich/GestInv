import React, { useState } from 'react';
import { Produit } from '../types';

type CardProps = {
  produit: Produit;
  addToPanier: (produit: Produit) => void;
};

const Card: React.FC<CardProps> = ({ produit, addToPanier }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToPanier = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToPanier(produit);
  };

  return (
    <div
      style={{
        width: '280px',
        height: '480px',
        perspective: '1000px',
        // marginTop: '10px',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-in-out',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={handleFlipCard}
      >
        {/* Face avant */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              // fontWeight: '600',
              position: 'absolute',
              // top: '8px',
              left: '10%',
              // transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 1 )',
              // padding: '4px 8px',
              borderRadius: '8px',
              zIndex: 1,
            }}
          >
            {produit.nom_produit} - {produit.dosage}
          </h3>
          {produit.image_url && (
            <img
              src={produit.image_url}
              alt={produit.nom_produit}
              style={{
                width: '100%',
                height: '192px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginTop: '40px',
              }}
            />
          )}
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>
            <strong>Laboratoire:</strong> {produit.laboratoire_fabriquant}
          </p>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3182ce', marginBottom: '16px' }}>
            {produit.prix}€
          </div>
          <button
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: 'white',
              padding: '8px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleAddToPanier}
          >
            Acheter
          </button>
          <button
            style={{
              marginTop: '8px',
              width: '100%',
              backgroundColor: '#edf2f7',
              color: '#4a5568',
              padding: '8px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFlipCard();
            }}
          >
            Plus d'info
          </button>
        </div>

        {/* Face arrière */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transform: 'rotateY(180deg)',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Description de {produit.nom_produit}
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '16px' }}>{produit.description}</p>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>
            <strong>Conservation:</strong> {produit.conservation}
          </p>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>
            <strong>Restrictions:</strong> {produit.restrictions}
          </p>
          <button
            style={{
              width: '100%',
              backgroundColor: '#edf2f7',
              color: '#4a5568',
              padding: '8px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFlipCard();
            }}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
