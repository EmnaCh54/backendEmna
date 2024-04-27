const express = require("express");
const router = express.Router();
const correctionController = require("../controllers/etudiant/correction.controller.js");

// Route pour trouver toutes les corrections
router.get("/correction", correctionController.findAllCorrections);

// Route pour trouver une correction par ID
router.get("/:correctionId", correctionController.findCorrectionById);

module.exports = router;