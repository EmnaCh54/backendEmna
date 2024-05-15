const express = require("express");
const router = express.Router();
const quizController = require("../controllers/enseignant/quiz.controller.js");

// Route pour créer un nouveau quiz
router.post("/quiz", quizController.createQuiz);

// Route pour récupérer tous les quizzes
router.get("/quiz", quizController.getAllQuizzes);

// Route pour récupérer un quiz par son ID
router.get("/quiz/:id", quizController.getQuizById);

// Route pour mettre à jour un quiz
router.put("/quiz/:id", quizController.updateQuiz);

// Route pour supprimer un quiz
router.delete("/quiz/:id", quizController.deleteQuiz);



module.exports = router;
