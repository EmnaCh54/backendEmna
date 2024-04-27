const express = require('express');
const router = express.Router();
const coursController = require('../controllers/etudiant/cours.controller.js');

// Trouver tous les cours avec les détails du contenu éducatif associé
router.get('/cours', coursController.findAllCours);

// Rechercher un cours par titre
router.get('/search', coursController.findCoursByTitle);

// Consulter un cours par ID avec les détails du contenu éducatif associé
router.get('/:coursId', coursController.findCoursById);

// Télécharger un cours par ID
router.get('/:coursId/download', coursController.downloadCoursById);

module.exports = router;