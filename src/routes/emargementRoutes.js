const express = require('express');
const {
    addEmargement,
    getEmargementsBySession,
} = require('../controllers/emargementController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route pour ajouter un émargement (réservée aux étudiants)
router.post('/', authMiddleware, addEmargement);

// Route pour obtenir les émargements d'une session (réservée aux formateurs)
router.get('/:session_id', authMiddleware, getEmargementsBySession);

module.exports = router;
