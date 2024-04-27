const Cours = require("../../models/exercice.model");
const ContenuEducatif = require("../../models/contenueducatif.model");
const Exercice = require("../../models/exercice.model");

// Trouver tous les cours avec les détails du contenu éducatif associé

exports.findAllExcercice = async(req, res) => {
    try {
        const exercices = await Exercice.find().populate("contenu_id");
        res.status(200).json(exercices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// Consulter un cours par ID avec les détails du contenu éducatif associé
exports.findOne = async(req, res) => {
    try {
        const exercice = await Exercice.findById(req.params.exerciceId).populate("contenu_id");

        if (!exercice) {
            return res.status(404).send({ message: `exercice non trouvé avec l'ID ${req.params.exerciceId}` });
        }

        res.json(exercice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};