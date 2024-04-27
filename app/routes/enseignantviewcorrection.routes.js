const express = require("express");
const router = express.Router();
const correctionController = require("../controllers/enseignant/correction.controller.js");

// Route pour trouver toutes les corrections
router.get("/correction", correctionController.findAllCorrections);

// Route pour trouver une correction par ID
router.get("/:correctionId", correctionController.findCorrectionById);

// Route pour créer une nouvelle correction
router.post("/correction", correctionController.createCorrection);

// Route pour mettre à jour une correction
router.put("/:correctionId", correctionController.updateCorrection);

// Route pour supprimer une correction
router.delete("/:correctionId", correctionController.deleteCorrection);

module.exports = router;