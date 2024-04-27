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
exports.findOneExercice = async(req, res) => {
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

// Endpoint pour modifier cours
exports.updateexercice = async(req, res) => {
    const exerciceId = req.params.exerciceId;

    try {
        // Mettre à jour l'exercice avec le corps de la requête
        const exercice = await Exercice.findByIdAndUpdate(exerciceId, {
            contenu_id: req.body.contenu_id,
            type_contenus: req.body.type_contenus,
            titre: req.body.titre,
            description: req.body.description,
            fichier_joint: req.body.fichier_joint,
            trimestre: req.body.trimestre,
            niveau_scolaire: req.body.niveau_scolaire,
            reporteur: req.body.reporteur,
            image: req.body.image,
        }, { new: true });

        if (!exercice) {
            return res.status(404).send({
                message: `Exercice non trouvé avec l'ID ${exerciceId}`
            });
        }

        // Mettre à jour le contenu éducatif associé à l'exercice
        const contenu = await ContenuEducatif.findByIdAndUpdate(exercice.contenu_id, {
            type_contenus: req.body.type_contenus,
            titre: req.body.titre,
            description: req.body.description,
            fichier_joint: req.body.fichier_joint,
            trimestre: req.body.trimestre,
            niveau_scolaire: req.body.niveau_scolaire,
            reporteur: req.body.reporteur,
            image: req.body.image,
        }, { new: true });

        // Renvoyer la réponse
        res.send({ exercice, contenu });
    } catch (err) {
        console.error(err);

        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Exercice non trouvé avec l'ID ${exerciceId}`
            });
        }

        return res.status(500).send({
            message: `Erreur lors de la mise à jour de l'exercice avec l'ID ${exerciceId}`
        });
    }
};



// Supprimer un cours
exports.deletexercice = async(req, res) => {
    try {
        const exercice = await Exercice.findByIdAndDelete(req.params.exerciceId);

        if (!exercice) {
            return res.status(404).send({ message: `exercice non trouvé avec l'ID ${req.params.exerciceId}` });
        }

        res.send({ message: "Exercice supprimé avec succès!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};