const express = require('express');
const {
    createSession,
    getAllSessions,
    updateSession,
    deleteSession,
} = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Créer une session (réservée aux formateurs)
router.post('/', authMiddleware, createSession);

//Obtenir la liste des sessions
router.get('/', authMiddleware, getAllSessions);

// Mettre à jour une session (réservée aux formateurs)
router.put('/:id', authMiddleware, updateSession);

//Supprimer une session (réservée aux formateurs)
router.delete('/:id', authMiddleware, deleteSession);

module.exports = router;
