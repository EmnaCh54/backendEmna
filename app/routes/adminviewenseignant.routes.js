const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/administration.controller.js");

// Les routes ici
router.get("/enseignants", adminController.findAllEnseignants);
router.get("/enseignants/:enseignantId", adminController.findEnseignantById);
router.put("/enseignants/:enseignantId", adminController.updateEnseignant);
router.delete("/enseignants/:enseignantId", adminController.deleteEnseignant);

module.exports = router;
