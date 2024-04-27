// emploiDuTemps.controller.js
const EmploiDuTemps = require('../../models/emploiDuTemps.model');

// Créer un nouvel emploi du temps pour un étudiant
exports.createEmploiDuTemps = async(req, res) => {
    try {
        const nouveauEmploiDuTemps = new EmploiDuTemps({
            etudiant: req.body.etudiant,
            // Ajoutez d'autres champs de l'emploi du temps ici
        });
        await nouveauEmploiDuTemps.save();
        res.status(201).json(nouveauEmploiDuTemps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Consulter l'emploi du temps d'un étudiant par son ID
exports.consulterEmploiDuTemps = async(req, res) => {
    try {
        const etudiantId = req.params.etudiantId;
        const emploiDuTemps = await EmploiDuTemps.findOne({ etudiant: etudiantId });
        res.status(200).json(emploiDuTemps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour l'emploi du temps d'un étudiant
exports.updateEmploiDuTemps = async(req, res) => {
    try {
        const etudiantId = req.params.etudiantId;
        const nouveauEmploiDuTemps = req.body;
        const resultat = await EmploiDuTemps.updateOne({ etudiant: etudiantId },
            nouveauEmploiDuTemps
        );
        res.status(200).json(resultat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Supprimer l'emploi du temps d'un étudiant
exports.deleteEmploiDuTemps = async(req, res) => {
    try {
        const etudiantId = req.params.etudiantId;
        await EmploiDuTemps.deleteOne({ etudiant: etudiantId });
        res.status(200).json({ message: 'Emploi du temps supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};