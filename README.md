SCRIPT DE CREATION DE BASE 'db_slam_ap'


CREATE TABLE t_allergie (
    id_t_allergie INT AUTO_INCREMENT PRIMARY KEY,
    nom_allergie VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    type_allergie ENUM('alimentaire', 'cutanée', 'saisonnière', 'médicamenteuse', 'perannuelles') NOT NULL,
    gravite ENUM('1', '2', '3', '4') NOT NULL,
    substance_causale VARCHAR(50)
);
 
CREATE TABLE t_pharmacie (
    id_t_pharmacie INT AUTO_INCREMENT PRIMARY KEY,
    ville VARCHAR(50) NOT NULL,
    adresse VARCHAR(255),
    region VARCHAR(50),
    departement VARCHAR(50),
    numero_telephone VARCHAR(15),
    lib_court VARCHAR(50),
    lib_long VARCHAR(255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP NULL DEFAULT NULL,
    createur INT
);
 
CREATE TABLE t_commande (
    id_t_commande INT AUTO_INCREMENT PRIMARY KEY,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en attente', 'validée', 'expédiée', 'annulée') DEFAULT 'en attente',
    total DECIMAL(10, 2) NOT NULL,
    id_t_pharmacie INT NOT NULL,
    FOREIGN KEY (id_t_pharmacie) REFERENCES t_pharmacie(id_t_pharmacie) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE t_rappel (
    id_t_rappel INT AUTO_INCREMENT PRIMARY KEY,
    heure_rappel TIME NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    frequence VARCHAR(50),
    quantite INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    instruction VARCHAR(255)
);
 
CREATE TABLE t_categorie (
    id_t_categorie INT AUTO_INCREMENT PRIMARY KEY,
    lib_court VARCHAR(50) NOT NULL,
    lib_long VARCHAR(255)
);
 
CREATE TABLE t_log_transaction (
    id_t_log_transaction INT AUTO_INCREMENT PRIMARY KEY,
    transaction_type ENUM('en attente', 'echec', 'valide') NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks VARCHAR(255),
    old_value VARCHAR(255),
    new_value VARCHAR(255)
);
 
CREATE TABLE t_log_admin (
    id_t_log_admin INT AUTO_INCREMENT PRIMARY KEY,
    action_type ENUM ('create', 'read', 'update', 'delete') NOT NULL,
    id_user INT NOT NULL,
    remarks VARCHAR(255)
);
 
CREATE TABLE t_produit (
    id_t_produit INT AUTO_INCREMENT PRIMARY KEY,
    nom_produit VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    forme ENUM('orale', 'dermique', 'injectable', 'médicamenteuse') NOT NULL,
    dosage VARCHAR(50),
    prix DECIMAL(10, 2) NOT NULL,
    laboratoire_fabriquant VARCHAR(50),
    image_url VARCHAR(255),
    restrictions VARCHAR(255),
    conservation VARCHAR(255),
    id_t_rappel INT,
    FOREIGN KEY (id_t_rappel) REFERENCES t_rappel(id_t_rappel)
        ON DELETE SET NULL ON UPDATE CASCADE
);
 
CREATE TABLE t_user (
    id_t_user INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    adresse_mail VARCHAR(100) NOT NULL UNIQUE,
    adresse VARCHAR(255),
    num_tel VARCHAR(15),
    date_naissance DATE,
    id_t_rappel INT,
    FOREIGN KEY (id_t_rappel) REFERENCES t_rappel(id_t_rappel)
        ON DELETE SET NULL ON UPDATE CASCADE
);
 
CREATE TABLE tj_commande_produit (
    id_t_produit INT NOT NULL,
    id_t_commande INT NOT NULL,
    quantite INT NOT NULL,
    PRIMARY KEY (id_t_produit, id_t_commande),
    FOREIGN KEY (id_t_produit) REFERENCES t_produit(id_t_produit)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_t_commande) REFERENCES t_commande(id_t_commande)
        ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE tj_commande_user (
    id_t_user INT NOT NULL,
    id_t_commande INT NOT NULL,
    id_t_log_transaction INT NOT NULL,
    PRIMARY KEY (id_t_user, id_t_commande, id_t_log_transaction),
    FOREIGN KEY (id_t_user) REFERENCES t_user(id_t_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_t_commande) REFERENCES t_commande(id_t_commande)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_t_log_transaction) REFERENCES t_log_transaction(id_t_log_transaction)
        ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE tj_user_allergie (
    id_t_allergie INT NOT NULL,
    id_t_user INT NOT NULL,
    PRIMARY KEY (id_t_allergie, id_t_user),
    FOREIGN KEY (id_t_allergie) REFERENCES t_allergie(id_t_allergie)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_t_user) REFERENCES t_user(id_t_user)
        ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE tj_produit_categorie (
    id_t_produit INT NOT NULL,
    id_t_categorie INT NOT NULL,
    PRIMARY KEY (id_t_produit, id_t_categorie),
    FOREIGN KEY (id_t_produit) REFERENCES t_produit(id_t_produit)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_t_categorie) REFERENCES t_categorie(id_t_categorie)
        ON DELETE CASCADE ON UPDATE CASCADE
);


SCRIPT D'INSERTION DE BASE

-- Table t_allergie
INSERT INTO t_allergie (nom_allergie, description, type_allergie, gravite, substance_causale)
VALUES 
('Pollens', 'Réaction aux pollens de graminées', 'saisonnière', '2', 'Pollens'),
('Arachides', 'Allergie aux arachides', 'alimentaire', '4', 'Arachides'),
('Pénicilline', 'Réaction allergique à la pénicilline', 'médicamenteuse', '3', 'Pénicilline');
 
-- Table t_pharmacie
INSERT INTO t_pharmacie (ville, adresse, region, departement, numero_telephone, lib_court, lib_long)
VALUES
('Paris', '10 Rue de la Santé', 'Île-de-France', '75', '0145678912', 'Pharma Paris', 'Pharmacie Paris Santé'),
('Lyon', '20 Avenue des Lumières', 'Auvergne-Rhône-Alpes', '69', '0478890012', 'Pharma Lyon', 'Grande Pharmacie Lyonnaise');
 
-- Table t_commande
INSERT INTO t_commande (date_commande, statut, total, id_t_pharmacie)
VALUES 
(NOW(), 'validée', 120.50, 1),
(NOW(), 'en attente', 85.30, 2);
 
-- Table t_rappel
INSERT INTO t_rappel (heure_rappel, date_debut, date_fin, frequence, quantite, instruction)
VALUES
('08:00:00', '2024-01-01', '2024-01-31', 'quotidien', 2, 'Prendre avec de l\'eau'),
('20:00:00', '2024-02-01', '2024-02-15', 'tous les deux jours', 1, 'Prendre après un repas');
 
-- Table t_categorie
INSERT INTO t_categorie (lib_court, lib_long)
VALUES
('Antibiotiques', 'Médicaments pour traiter les infections bactériennes'),
('Antihistaminiques', 'Médicaments contre les allergies'),
('Antalgiques', 'Médicaments contre la douleur');
 
-- Table t_log_transaction
INSERT INTO t_log_transaction (transaction_type, remarks, old_value, new_value)
VALUES
('valide', 'Transaction réussie', 'Statut: en attente', 'Statut: valide'),
('echec', 'Paiement refusé', NULL, NULL);
 
-- Table t_log_admin
INSERT INTO t_log_admin (action_type, id_user, remarks)
VALUES
('create', 1, 'Création d\'une nouvelle pharmacie'),
('update', 2, 'Mise à jour des informations d\'un produit');
 
-- Table t_produit
INSERT INTO t_produit (nom_produit, description, forme, dosage, prix, laboratoire_fabriquant, image_url, restrictions, conservation, id_t_rappel)
VALUES
('Doliprane', 'Paracétamol pour douleur et fièvre', 'orale', '500mg', 2.50, 'Sanofi', 'https://www.pharmacie-du-centre-albert.fr/resize/600x600/media/finish/img/normal/56/3400936381865-paracetamol-biogaran-1g-8-comprimes.jpg',  'Aucune restriction', 'Conserver à température ambiante', 1),
('Amoxicilline', 'Antibiotique à large spectre', 'orale', '1g', 8.90, 'GSK', 'https://cdn.pim.mesoigner.fr/mesoigner/b77e88b7821cc28583840a8d5e3113af/mesoigner-thumbnail-1000-1000-inset/765/264/amoxicilline-biogaran-125-mg-5-ml-poudre-pour-suspension-buvable.webp', 'Pas pour les allergiques à la pénicilline', 'Conserver au frais', 2);
 
-- Table t_user
INSERT INTO t_user (nom, prenom, adresse_mail, adresse, num_tel, date_naissance, id_t_rappel)
VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '12 Rue de la Paix, Paris', '0612345678', '1980-05-15', 1),
('Martin', 'Marie', 'marie.martin@example.com', '45 Avenue des Fleurs, Lyon', '0623456789', '1990-07-20', 2);
 
-- Table tj_commande_produit
INSERT INTO tj_commande_produit (id_t_produit, id_t_commande, quantite)
VALUES
(1, 1, 2),
(2, 2, 1);
 
-- Table tj_commande_user
INSERT INTO tj_commande_user (id_t_user, id_t_commande, id_t_log_transaction)
VALUES
(1, 1, 1),
(2, 2, 2);
 
-- Table tj_user_allergie
INSERT INTO tj_user_allergie (id_t_allergie, id_t_user)
VALUES
(1, 1),
(2, 2);
 
-- Table tj_produit_categorie
INSERT INTO tj_produit_categorie (id_t_produit, id_t_categorie)
VALUES
(1, 3),
(2, 1);