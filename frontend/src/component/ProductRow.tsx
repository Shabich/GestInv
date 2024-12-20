import React from 'react';

interface Produit {
  id_t_produit: number;
  nom_produit: string;
  description: string;
  prix: number;
}

interface ProduitRowProps {
  produit: Produit;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProduitRow: React.FC<ProduitRowProps> = ({ produit, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{produit.id_t_produit}</td>
      <td>{produit.nom_produit}</td>
      <td>{produit.prix}€</td>
      <td>{produit.description}</td>
      <td>
        <button onClick={() => onEdit(produit.id_t_produit)}>Modifier</button>
        <button onClick={() => onDelete(produit.id_t_produit)} style={{ marginLeft: '5px' }}>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default ProduitRow;
