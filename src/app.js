const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Routes pour l'authentification (signup, login)
const sessionRoutes = require('./routes/sessionRoutes'); // Routes pour la gestion des sessions
const emargementRoutes = require('./routes/emargementRoutes'); // Routes pour la gestion des émargements
require('dotenv').config(); // Charger les variables d'environnement
const db = require('./config'); // Charger la configuration de la base de données

const app = express();

// Middleware pour traiter les données JSON dans les requêtes
app.use(express.json());

// Tester la connexion à la base de données
(async () => {
    try {
        await db.query('SELECT 1');
        console.log('Connexion à la base de données réussie !');
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        process.exit(1); // Arrêter l'application si la connexion échoue
    }
})();

// Utilisation des routes
app.use('/auth', authRoutes); // Routes pour l'authentification
app.use('/sessions', sessionRoutes); // Routes pour la gestion des sessions
app.use('/emargements', emargementRoutes); // Routes pour la gestion des émargements

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
