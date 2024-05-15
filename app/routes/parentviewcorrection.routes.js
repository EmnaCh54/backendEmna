const express = require("express");
const router = express.Router();
const CorrectionController = require("../controllers/parent/correction.controller.js");

// Définissez la route GET avec la fonction de rappel correctement définie
router.get("/corrections", CorrectionController.findAllCorrections);
router.get("/:correctionId", CorrectionController.findCorrectionById);

module.exports = router;
