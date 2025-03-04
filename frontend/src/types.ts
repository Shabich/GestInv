export type Categorie = {
  id_t_categorie: number
  lib_court: string
  lib_long: string
}
export type Produit = {
  quantité: number;
  id_t_produit: number; // Identifiant unique
  nom_produit: string;
  forme: string;
  dosage: number;
  prix: number;
  laboratoire_fabriquant: string;
  restrictions: string;
  conservation: string;
  description: string;
  image_url?: string; // Propriété optionnelle

};

