export type Categorie = {
  id_t_categorie: number
  lib_court: string
  lib_long: string
}
export type Produit = {

  id_t_produit: number
  nom_produit: string
  forme: string
  dosage: number
  prix: number
  laboratoire_fabriquant: string
  restrictions: string
  conservation: string
  id_produit: number
  id: number;
  description: string;
  image_url?: string; // Propriété optionnelle
 
}
