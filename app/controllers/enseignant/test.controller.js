const ContenuEducatif = require("../../models/contenueducatif.model");
const Test = require("../../models/test.model");

// Trouver tous les tests avec les détails du contenu éducatif associé
exports.findAllTests = async(req, res) => {
    try {
        const tests = await Test.find().populate("contenu_id");
        res.status(200).json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Consulter un test par ID avec les détails du contenu éducatif associé
exports.findOneTest = async(req, res) => {
    try {
        const test = await Test.findById(req.params.testId).populate("contenu_id");

        if (!test) {
            return res.status(404).send({ message: `Test non trouvé avec l'ID ${req.params.testId}` });
        }

        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Endpoint pour modifier un test
exports.updateTest = async(req, res) => {
    const testId = req.params.testId;

    try {
        // Mettre à jour le test avec le corps de la requête
        const test = await Test.findByIdAndUpdate(testId, {
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

        if (!test) {
            return res.status(404).send({
                message: `Test non trouvé avec l'ID ${testId}`
            });
        }

        // Mettre à jour le contenu éducatif associé au test
        const contenu = await ContenuEducatif.findByIdAndUpdate(test.contenu_id, {
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
        res.send({ test, contenu });
    } catch (err) {
        console.error(err);

        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Test non trouvé avec l'ID ${testId}`
            });
        }

        return res.status(500).send({
            message: `Erreur lors de la mise à jour du test avec l'ID ${testId}`
        });
    }
};

// Supprimer un test
exports.deleteTest = async(req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.testId);

        if (!test) {
            return res.status(404).send({ message: `Test non trouvé avec l'ID ${req.params.testId}` });
        }

        res.send({ message: "Test supprimé avec succès!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};