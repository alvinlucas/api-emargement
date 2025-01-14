const express = require('express');
const {
    addEmargement,
    getEmargementsBySession,
} = require('../controllers/emargementController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//Ajouter un émargement (réservée aux étudiants)
router.post('/', authMiddleware, addEmargement);

// Obtenir les émargements d'une session (réservée aux formateurs)
router.get('/:session_id', authMiddleware, getEmargementsBySession);

module.exports = router;
