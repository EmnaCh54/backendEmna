const express = require("express");
const router = express.Router();
const contenuEducatifController = require("../controllers/enseignant/contenueducatif.controller");

router.post("/contenuseducatif", contenuEducatifController.create);

module.exports = router;
