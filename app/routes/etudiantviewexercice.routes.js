const express = require("express");
const router = express.Router();
const exerciceController = require("../controllers/etudiant/exercice.controller.js");

// Routes for Exercices
router.get("/exercices", exerciceController.findAllExcercice);
router.get("/exercices/:exerciceId", exerciceController.findOne);


module.exports = router;