// emploiDuTemps.routes.js
const express = require('express');
const router = express.Router();
const emploiDuTempsController = require('../controllers/etudiant/emploiDuTemps.controller.js');

// Créer un nouvel emploi du temps pour un étudiant
router.post('/', emploiDuTempsController.createEmploiDuTemps);

// Consulter l'emploi du temps d'un étudiant par son ID
router.get('/:etudiantId', emploiDuTempsController.consulterEmploiDuTemps);

// Mettre à jour l'emploi du temps d'un étudiant
router.put('/:etudiantId', emploiDuTempsController.updateEmploiDuTemps);

// Supprimer l'emploi du temps d'un étudiant
router.delete('/:etudiantId', emploiDuTempsController.deleteEmploiDuTemps);

module.exports = router;