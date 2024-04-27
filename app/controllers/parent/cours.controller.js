const Cours = require("../../models/cours.model");
const ContenuEducatif = require("../../models/contenueducatif.model");

// Trouver tous les cours avec les détails du contenu éducatif associé
exports.findAllCours = async(req, res) => {
    try {
        const cours = await Cours.find().populate("contenu_id");

        res.status(200).json(cours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Consulter un cours par ID avec les détails du contenu éducatif associé
exports.findCoursById = async(req, res) => {
    try {
        const cours = await Cours.findById(req.params.coursId).populate("contenu_id");

        if (!cours) {
            return res.status(404).send({ message: `Cours non trouvé avec l'ID ${req.params.coursId}` });
        }

        res.json(cours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
// Télécharger un cours par ID
exports.downloadCoursById = async(req, res) => {
    try {
        const cours = await Cours.findById(req.params.coursId);
        if (!cours) {
            return res.status(404).send({ message: `Cours not found with ID ${req.params.coursId}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Rechercher un cours par titre
exports.findCoursByTitle = async(req, res) => {
    try {
        const titre = req.query.titre;
        const cours = await ContenuEducatif.find({ titre: { $regex: new RegExp(titre, "i") } });

        res.status(200).json(cours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};