const express = require("express");
const router = express.Router();

const quizController = require("../controllers/enseignant/quiz.controller.js");

// Routes for CRUD operations on quizzes
router.post("/quizzes", quizController.create);
router.get("/quizzes", quizController.findAll);
router.get("/quizzes/:quizId", quizController.findOne);
router.put("/quizzes/:quizId", quizController.update);
router.delete("/quizzes/:quizId", quizController.delete);

module.exports = router;
