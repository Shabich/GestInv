import React from 'react';

interface Produit {
  id_t_produit: number;
  nom_produit: string;
  description: string;
  prix: number;
}

interface ProduitRowProps {
  produit: Produit;
  index: number

  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProduitRow: React.FC<ProduitRowProps> = ({ produit, onEdit, onDelete, index}) => {
  const isEven = index % 2 === 0
  console.log(isEven, index)

  return (
    <tr style={{ backgroundColor: isEven ? '#cce3ff' : 'transparent' }}>
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
