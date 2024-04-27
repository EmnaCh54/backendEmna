const Correction = require("../../models/correction.model");

// Trouver toutes les corrections
exports.findAllCorrections = async(req, res) => {
    try {
        const corrections = await Correction.find().populate("enseignant_id", "nom prenom");
        res.status(200).json(corrections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche des corrections." });
    }
};

// Trouver une correction par ID
exports.findCorrectionById = async(req, res) => {
    try {
        const correction = await Correction.findById(req.params.correctionId).populate("enseignant_id", "nom prenom");
        if (!correction) {
            return res.status(404).send({ message: `Correction non trouvée avec l'ID ${req.params.correctionId}` });
        }
        res.json(correction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de la correction." });
    }
};
// Créer une nouvelle correction
exports.createCorrection = async(req, res) => {
    try {
        const newCorrection = await Correction.create(req.body);
        res.status(201).json(newCorrection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la correction." });
    }
};

// Mettre à jour une correction
exports.updateCorrection = async(req, res) => {
    const correctionId = req.params.correctionId;
    try {
        const updatedCorrection = await Correction.findByIdAndUpdate(correctionId, req.body, { new: true });
        if (!updatedCorrection) {
            return res.status(404).send({ message: `Correction non trouvée avec l'ID ${correctionId}` });
        }
        res.json(updatedCorrection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la correction." });
    }
};

// Supprimer une correction
exports.deleteCorrection = async(req, res) => {
    try {
        const deletedCorrection = await Correction.findByIdAndDelete(req.params.correctionId);
        if (!deletedCorrection) {
            return res.status(404).send({ message: `Correction non trouvée avec l'ID ${req.params.correctionId}` });
        }
        res.send({ message: "Correction supprimée avec succès!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la correction." });
    }
};