// routes/enseignantRoutes.js
const express = require("express");
const router = express.Router();
const enseignantController = require("../controllers/parent/enseignant.controller.js");

// Liste des enseignants
router.get("/enseignants", enseignantController.findAllEnseignants);

// Détails d'un enseignant spécifique
router.get(
  "/enseignants/:enseignantId",
  enseignantController.findEnseignantById
);

module.exports = router;
