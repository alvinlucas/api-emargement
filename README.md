
# API d'Émargement

## Description

Cette API permet de gérer une application d'émargement pour des formations. Elle inclut :
- La gestion des utilisateurs (formateurs et étudiants).
- La gestion des sessions de cours (création, modification, suppression, liste).
- La gestion des émargements (ajouter une présence, lister les présences pour une session).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

---

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd api-emargement
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez la base de données :
   - Assurez-vous que MySQL est en cours d'exécution.
   - Exécutez le fichier SQL `src/database/init.sql` pour créer la base de données et les tables.

4. Configurez le fichier `.env` :
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les variables suivantes :
     ```plaintext
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=secret
     DB_NAME=emargement_db
     JWT_SECRET=supersecret
     ```

---

## Lancement

1. Lancez le serveur en mode développement :
   ```bash
   npm run dev
   ```

2. Si tout fonctionne, vous devriez voir ce message dans la console :
   ```
   Connexion à la base de données réussie !
   Serveur démarré sur le port 3000
   ```

---

## Routes de l'API

### **1. Authentification**

#### Inscription
- **POST** `/auth/signup`
- **Description :** Inscrire un utilisateur (formateur ou étudiant).
- **Body (JSON) :**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "role": "formateur"
  }
  ```
- **Réponse :**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "formateur"
  }
  ```

#### Connexion
- **POST** `/auth/login`
- **Description :** Connecter un utilisateur.
- **Body (JSON) :**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Réponse :**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6..."
  }
  ```

---

### **2. Sessions**

#### Créer une session
- **POST** `/sessions`
- **Description :** Créer une session (formateurs uniquement).
- **Headers :**
  - `Authorization: Bearer <token>`
- **Body (JSON) :**
  ```json
  {
    "title": "Cours Node.js",
    "date": "2025-01-14",
    "formateur_id": 1
  }
  ```
- **Réponse :**
  ```json
  {
    "id": 1,
    "title": "Cours Node.js",
    "date": "2025-01-14",
    "formateur_id": 1
  }
  ```

#### Lister toutes les sessions
- **GET** `/sessions`
- **Description :** Obtenir la liste des sessions.
- **Headers :**
  - `Authorization: Bearer <token>`
- **Réponse :**
  ```json
  [
    {
      "id": 1,
      "title": "Cours Node.js",
      "date": "2025-01-14",
      "formateur_id": 1
    }
  ]
  ```

#### Modifier une session
- **PUT** `/sessions/:id`
- **Description :** Modifier une session (formateurs uniquement).
- **Headers :**
  - `Authorization: Bearer <token>`
- **Body (JSON) :**
  ```json
  {
    "title": "Cours Node.js - Avancé",
    "date": "2025-01-15"
  }
  ```
- **Réponse :**
  ```json
  {
    "message": "Session mise à jour avec succès"
  }
  ```

#### Supprimer une session
- **DELETE** `/sessions/:id`
- **Description :** Supprimer une session (formateurs uniquement).
- **Headers :**
  - `Authorization: Bearer <token>`
- **Réponse :**
  ```json
  {
    "message": "Session supprimée avec succès"
  }
  ```

---

### **3. Émargements**

#### Ajouter un émargement
- **POST** `/emargements`
- **Description :** Ajouter un émargement (étudiants uniquement).
- **Headers :**
  - `Authorization: Bearer <token>`
- **Body (JSON) :**
  ```json
  {
    "session_id": 1,
    "etudiant_id": 2,
    "status": true
  }
  ```
- **Réponse :**
  ```json
  {
    "id": 1,
    "session_id": 1,
    "etudiant_id": 2,
    "status": true
  }
  ```

#### Lister les émargements pour une session
- **GET** `/emargements/:session_id`
- **Description :** Obtenir la liste des émargements pour une session (formateurs uniquement).
- **Headers :**
  - `Authorization: Bearer <token>`
- **Réponse :**
  ```json
  [
    {
      "id": 1,
      "session_id": 1,
      "etudiant_id": 2,
      "status": true
    }
  ]
  ```

---

## Tests avec Postman

1. Importez les routes dans Postman.
2. Ajoutez le token JWT dans les headers pour les routes protégées :
   - **Key :** `Authorization`
   - **Value :** `Bearer <token>`.

---

## Auteur

Projet réalisé par Alvin LUCAS dans le cadre du TP Web Services.
