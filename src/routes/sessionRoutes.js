const express = require('express');
const {
    createSession,
    getAllSessions,
    updateSession,
    deleteSession,
} = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route pour créer une session (réservée aux formateurs)
router.post('/', authMiddleware, createSession);

// Route pour obtenir la liste des sessions
router.get('/', authMiddleware, getAllSessions);

// Route pour mettre à jour une session (réservée aux formateurs)
router.put('/:id', authMiddleware, updateSession);

// Route pour supprimer une session (réservée aux formateurs)
router.delete('/:id', authMiddleware, deleteSession);

module.exports = router;
