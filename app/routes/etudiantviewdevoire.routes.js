const express = require("express");
const router = express.Router();
const devoireController = require("../controllers/etudiant/devoir.controller.js");

// Routes pour les opérations  sur les devoires
router.get("/devoire", devoireController.findAll);
router.get("/devoire/:devoireId", devoireController.findOneDevoir);

module.exports = router;