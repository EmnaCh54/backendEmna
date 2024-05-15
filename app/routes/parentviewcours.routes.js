const express = require("express");
const router = express.Router();
const coursController = require("../controllers/parent/cours.controller.js");

// Routes pour les opérations CRUD sur les cours
router.get("/cours", coursController.findAllCours);
router.get("/cours/:coursId", coursController.findCoursById);
//Routes pour recherche cours par titre
router.get("/cours/recherche/titre", coursController.findCoursByTitle);
router.get("/download/:courId", coursController.downloadCoursById);

module.exports = router;