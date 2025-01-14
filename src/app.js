const express = require('express');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const emargementRoutes = require('./routes/emargementRoutes');
require('dotenv').config();
const db = require('./config');

const app = express();

app.use(express.json());

(async () => {
    try {
        await db.query('SELECT 1');
        console.log('Connexion à la base de données réussie !');
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        process.exit(1);
    }
})();

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);
app.use('/emargements', emargementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
