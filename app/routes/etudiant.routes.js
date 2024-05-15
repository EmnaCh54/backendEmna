const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiant/configuration.controller.js");

// Routes pour les opérations CRUD sur les étudiants
router.get("/all", etudiantController.getAllEtudiants);
router.patch("/activate/:id", etudiantController.activateEtudiant);
router.patch("/deactivate/:id", etudiantController.deactivateEtudiant);
router.get("/:id", etudiantController.getEtudiantProfile);
router.patch("/update/:id", etudiantController.updateEtudiantProfile);
router.delete("/delete/:id", etudiantController.deleteEtudiant);

module.exports = router;
