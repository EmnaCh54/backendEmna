const express = require("express");
const router = express.Router();
const devoirController = require("../controllers/enseignant/devoir.controller.js");

// Route pour trouver tous les devoirs avec les détails du contenu éducatif associé
router.get("/devoirs", devoirController.findAllDevoirs);

// Route pour consulter un devoir par son ID avec les détails du contenu éducatif associé
router.get("/devoirs/:devoirId", devoirController.findOneDevoir);

// Route pour mettre à jour un devoir
router.put("/devoirs/:devoirId", devoirController.updateDevoir);

// Route pour supprimer un devoir
router.delete("/devoirs/:devoirId", devoirController.deleteDevoir);

module.exports = router;
