const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller.js");

// Point de terminaison pour le formulaire de contact
router.post("/", contactController.sendEmail);

module.exports = router;
