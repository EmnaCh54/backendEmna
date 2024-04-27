const express = require("express");
const router = express.Router();

const correctionController = require("../controllers/parent/correction.controller.js");

// Routes pour les opérations CRUD sur les corrections
router.get("/corrections", correctionController.findAll);
router.get("/corrections/:correctionId", correctionController.findOne);

module.exports = router;
