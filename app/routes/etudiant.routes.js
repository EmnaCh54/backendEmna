const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiant/configuration.controller.js");

// Routes pour les opérations CRUD sur les étudiants
router.patch("/activate/:etudiantId", etudiantController.activateEtudiant);
router.patch("/deactivate/:etudiantId", etudiantController.deactivateEtudiant);
router.get("/:etudiantId", etudiantController.findEtudiantById);
router.patch("/update/:etudiantId", etudiantController.updateEtudiantProfile);
router.delete("/delete/:etudiantId", etudiantController.deleteEtudiant);

module.exports = router;