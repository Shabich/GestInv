# README - Application Web GSB

## Introduction
L'application web GSB est une plateforme e-commerce permettant aux utilisateurs d'acheter des produits pharmaceutiques en ligne. Ce projet est structuré en **monorepo**, intégrant **frontend** et **backend** dans un même dépôt.


## Technologies Utilisées
- **Frontend** : React, TypeScript, Tailwind CSS, Vite
- **Backend** : Node.js, Express, TypeScript
- **Base de données** : MySQL
- **Gestion du projet** : npm workspaces
- **Tests** : Jest (tests à venir)

## Installation et Exécution

### 1. Cloner le dépôt
```sh
git clone <URL_DU_REPO>
cd <NOM_DU_REPO>
```

### 2. Installer les dépendances
```sh
npm install
```

### 3. Lancer le projet en mode développement
```sh
npm run dev
```
Cette commande exécute **concurrently** le backend et le frontend.

## Structure du Monorepo

```
root/
│── frontend/
│── backend/
│── package.json (gestion des workspaces)
```

### Scripts globaux
Les scripts de gestion sont définis dans `package.json` à la racine :
```json
"scripts": {
  "backend": "npm run dev -w backend",
  "frontend": "npm run dev -w frontend",
  "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
  "test:backend": "npm test -w backend",
  "test:frontend": "npm test -w frontend"
}
```

## Frontend

### Structure du projet
- `src/component/` : Composants réutilisables
- `src/page/` : Pages principales (Accueil, Connexion, Produits...)
- `src/router.tsx` : Gestion de la navigation avec `react-router-dom`
- `src/utils/api.ts` : Gestion centralisée des requêtes HTTP

### Commandes utiles
- **Lancer en mode dev** : `npm run dev -w frontend`
- **Construire l’application** : `npm run build -w frontend`
- **Tester** : `npm run test -w frontend`

## Backend

### Structure du projet
- `Authent/` : Gestion de l'authentification (JWT, middleware...)
- `Commande/` : Gestion des commandes
- `Produits/` : Gestion des produits
- `Users/` : Gestion des utilisateurs
- `config/db.ts` : Configuration de la base de données
- `server.ts` : Point d'entrée du backend

### Commandes utiles
- **Lancer en mode dev** : `npm run dev -w backend`
- **Tester** : `npm run test -w backend`

## Contribution
1. Forker le dépôt
2. Créer une branche `feature/ma-fonctionnalité`
3. Développer votre fonctionnalité
4. Soumettre une PR

## Licence
Réalisé par Thomas de Almeida

