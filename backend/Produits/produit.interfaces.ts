export interface Produit {
    id_t_produit?: number;
    nom_produit: string;
    description: string;
    forme: 'orale' | 'dermique' | 'injectable' | 'médicamenteuse';
    dosage: string;
    prix: number;
    laboratoire_fabriquant: string;
    id_t_categorie: number;
    image_url: string
  }
  