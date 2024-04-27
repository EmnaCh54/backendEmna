const express = require('express');
const router = express.Router();
const testController = require('../controllers/enseignant/test.controller.js');

// Route pour trouver tous les tests avec les détails du contenu éducatif associé
router.get('/tests', testController.findAllTests);

// Route pour consulter un test par son ID avec les détails du contenu éducatif associé
router.get('/tests/:testId', testController.findOneTest);

// Route pour mettre à jour un test
router.put('/tests/:testId', testController.updateTest);

// Route pour supprimer un test
router.delete('/tests/:testId', testController.deleteTest);

module.exports = router;