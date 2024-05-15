const Quiz = require('../../models/quiz.model.js');

// Contrôleur pour gérer les opérations CRUD des quizzes
const quizController = {
    // Méthode pour créer un nouveau quiz
    createQuiz: async (req, res) => {
        try {
            const newQuiz = new Quiz(req.body);
            await newQuiz.save();
            res.status(201).json(newQuiz);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Méthode pour récupérer tous les quizzes
    getAllQuizzes: async (req, res) => {
        try {
            const quizzes = await Quiz.find();
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Méthode pour récupérer un quiz par son ID
    getQuizById: async (req, res) => {
        try {
            const quiz = await Quiz.findById(req.params.id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz non trouvé' });
            }
            res.json(quiz);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Méthode pour mettre à jour un quiz
    updateQuiz: async (req, res) => {
        try {
            const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz non trouvé' });
            }
            res.json(quiz);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Méthode pour supprimer un quiz
    deleteQuiz: async (req, res) => {
        try {
            const quiz = await Quiz.findByIdAndDelete(req.params.id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz non trouvé' });
            }
            res.json({ message: 'Quiz supprimé avec succès' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = quizController;
