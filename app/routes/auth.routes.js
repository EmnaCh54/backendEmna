const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth/login.controller.js");
const registerController = require("../controllers/auth/register.controller.js");

// Route pour l'inscription
router.post("/register", registerController.register);
// Route pour la connexion
router.post("/login", loginController.login);

module.exports = router;
