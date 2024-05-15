const express = require("express");
const router = express.Router();
const devoireController = require("../controllers/etudiant/devoir.controller.js");

// Route pour trouver tous les devoirs avec les détails du contenu éducatif associé
router.get('/devoirs', devoireController.findAllDevoirs);

// Route pour consulter un devoir par son ID avec les détails du contenu éducatif associé
router.get('/devoirs/:devoirId', devoireController.findOneDevoir);


module.exports = router;