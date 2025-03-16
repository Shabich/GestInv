CREATE DATABASE db_slam_ap;
USE db_slam_ap;

-- Table des catégories de produits
CREATE TABLE t_categorie (
  id_t_categorie INT NOT NULL,
  lib_court VARCHAR(50) NOT NULL,
  lib_long VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_t_categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des commandes
CREATE TABLE t_commande (
  id_t_commande INT NOT NULL,
  date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut ENUM('en attente', 'validée', 'expédiée', 'annulée') DEFAULT 'en attente',
  total DECIMAL(10,2) NOT NULL,
  id_t_user INT NOT NULL,
  PRIMARY KEY (id_t_commande),
  CONSTRAINT fk_commande_user FOREIGN KEY (id_t_user) REFERENCES t_user(id_t_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des logs administratifs
CREATE TABLE t_log_admin (
  id_t_log_admin INT NOT NULL,
  action_type ENUM('create', 'read', 'update', 'delete') NOT NULL,
  id_user INT NOT NULL,
  id_admin INT NOT NULL,
  remarks VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_t_log_admin),
  CONSTRAINT fk_log_admin_user FOREIGN KEY (id_user) REFERENCES t_user(id_t_user),
  CONSTRAINT fk_log_admin_admin FOREIGN KEY (id_admin) REFERENCES t_user(id_t_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des pharmacies
CREATE TABLE t_pharmacie (
  id_t_pharmacie INT NOT NULL,
  ville VARCHAR(50) NOT NULL,
  adresse VARCHAR(255) DEFAULT NULL,
  region VARCHAR(50) DEFAULT NULL,
  departement VARCHAR(50) DEFAULT NULL,
  numero_telephone VARCHAR(15) DEFAULT NULL,
  lib_court VARCHAR(50) DEFAULT NULL,
  lib_long VARCHAR(255) DEFAULT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP NULL DEFAULT NULL,
  createur INT DEFAULT NULL,
  PRIMARY KEY (id_t_pharmacie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des produits
CREATE TABLE t_produit (
  id_t_produit INT NOT NULL,
  nom_produit VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  forme ENUM('orale', 'dermique', 'injectable', 'médicamenteuse') NOT NULL,
  dosage VARCHAR(50) DEFAULT NULL,
  prix DECIMAL(10,2) NOT NULL,
  laboratoire_fabriquant VARCHAR(50) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  restrictions VARCHAR(255) DEFAULT NULL,
  conservation VARCHAR(255) DEFAULT NULL,
  id_t_categorie INT DEFAULT NULL,
  PRIMARY KEY (id_t_produit),
  CONSTRAINT fk_produit_categorie FOREIGN KEY (id_t_categorie) REFERENCES t_categorie(id_t_categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des utilisateurs
CREATE TABLE t_user (
  id_t_user INT NOT NULL,
  nom VARCHAR(50) DEFAULT NULL,
  prenom VARCHAR(50) DEFAULT NULL,
  adresse_mail VARCHAR(100) DEFAULT NULL,
  adresse VARCHAR(255) DEFAULT NULL,
  num_tel VARCHAR(15) DEFAULT NULL,
  date_naissance DATE DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  admin TINYINT DEFAULT '0',
  id_t_pharmacie INT DEFAULT NULL,
  PRIMARY KEY (id_t_user),
  CONSTRAINT fk_user_pharmacie FOREIGN KEY (id_t_pharmacie) REFERENCES t_pharmacie(id_t_pharmacie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table de jointure entre commandes et produits
CREATE TABLE tj_commande_produit (
  id_t_produit INT NOT NULL,
  id_t_commande INT NOT NULL,
  quantite INT NOT NULL,
  PRIMARY KEY (id_t_produit, id_t_commande),
  CONSTRAINT fk_commande_produit_produit FOREIGN KEY (id_t_produit) REFERENCES t_produit(id_t_produit),
  CONSTRAINT fk_commande_produit_commande FOREIGN KEY (id_t_commande) REFERENCES t_commande(id_t_commande)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
