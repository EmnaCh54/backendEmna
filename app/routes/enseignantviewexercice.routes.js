const express = require("express");
const router = express.Router();

const exerciceController = require("../controllers/enseignant/exercice.controller.js");

// Routes pour les opérations CRUD sur les exercices
router.get("/exercices", exerciceController.findAllExcercice);
router.get("/exercices/:exerciceId", exerciceController.findOneExercice);
router.put("/exercices/:exerciceId", exerciceController.updateexercice);
router.delete("/exercices/:exerciceId", exerciceController.deletexercice);

module.exports = router;