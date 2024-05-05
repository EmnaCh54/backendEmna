const express = require("express");
const router = express.Router();
const coursController = require("../controllers/enseignant/cours.controller.js");

// Route pour trouver tous les cours
router.get("/cours", coursController.findAllCours);

// Route pour trouver un cours par son ID
router.get("/cours/:coursId", coursController.findCoursById);

// Route pour mettre à jour un cours
router.put("/cours/:coursId", coursController.updatecours);

// Route pour supprimer un cours
router.delete("/cours/:coursId", coursController.deleteCours);

module.exports = router;
