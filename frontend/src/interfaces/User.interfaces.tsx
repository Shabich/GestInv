// Interface pour l'utilisateur
interface User {
    id_t_user: number;
    nom: string | null;
    prenom: string | null;
    adresse_mail: string | null;
    adresse: string | null;
    num_tel: string | null;
    date_naissance: string | null; // format 'YYYY-MM-DD'
    password: string | null;
    admin: number; // 0 pour non admin, 1 pour admin
    id_t_pharmacie: number | null;
  }