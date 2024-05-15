const ContenuEducatif = require("../../models/contenueducatif.model");
const Devoir = require("../../models/devoir.model");

// Trouver tous les devoirs avec les détails du contenu éducatif associé
exports.findAllDevoirs = async(req, res) => {
    try {
        const devoirs = await Devoir.find().populate("contenu_id");
        res.status(200).json(devoirs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Consulter un devoir par son ID avec les détails du contenu éducatif associé
exports.findOneDevoir = async(req, res) => {
    try {
        const devoir = await Devoir.findById(req.params.devoirId).populate("contenu_id");

        if (!devoir) {
            return res.status(404).send({ message: `Devoir non trouvé avec l'ID ${req.params.devoirId}` });
        }

        res.json(devoir);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};