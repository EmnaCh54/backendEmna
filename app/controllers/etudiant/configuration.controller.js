const mongoose = require("mongoose");
const Utilisateur = require("../../models/utilisateur.model");
const Etudiant = require("../../models/etudiant.model");

exports.activateEtudiant = async(req, res) => {
    try {
        const activatedEtudiant = await Etudiant.findByIdAndUpdate(
            req.params.id, { statut: "actif" }, { new: true }
        );
        res.json(activatedEtudiant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deactivateEtudiant = async(req, res) => {
    try {
        const deactivatedEtudiant = await Etudiant.findByIdAndUpdate(
            req.params.id, { statut: "inactif" }, { new: true }
        );
        res.json(deactivatedEtudiant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.findEtudiantById = (req, res) => {
    const etudiantId = req.params.etudiantId;

    Etudiant.findById(etudiantId)
        .populate("utilisateur")
        .then((etudiant) => {
            if (!etudiant) {
                return res.status(404).send({
                    message: `Etudiant not found with ID ${etudiantId}`,
                });
            }
            res.send(etudiant);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: `Etudiant not found with ID ${etudiantId}`,
                });
            }
            return res.status(500).send({
                message: `Error retrieving etudiant with ID ${etudiantId}`,
            });
        });
};


exports.updateEtudiantProfile = async(req, res) => {
    const etudiantId = req.params.id; // Utiliser le même nom de paramètre

    try {
        // Mettre à jour le etudiant avec le corps de la requête
        const etudiant = await Etudiant.findByIdAndUpdate(
            etudiantId, {
                utilisateur_id: req.body.utilisateur_id,
                nom: req.body.nom,
                prenom: req.body.prenom,
                mot_de_passe: req.body.mot_de_passe,
                email: req.body.email,
                adresse: req.body.adresse,
                role: req.body.role,
                niveaueducation: req.body.niveauetude,
            }, { new: true }
        );

        if (!etudiant) {
            return res.status(404).send({
                message: `etudiant non trouvé avec l'ID ${etudiantId}`,
            });
        }

        // Mettre à jour l'utilisateur
        const utilisateurId = etudiant.utilisateur_id;
        const utilisateur = await Utilisateur.findByIdAndUpdate(
            utilisateurId, {
                nom: req.body.nom,
                prenom: req.body.prenom,
                mot_de_passe: req.body.mot_de_passe,
                email: req.body.email,
                adresse: req.body.adresse,
                role: req.body.role,
                niveaueducation: req.body.niveauetude,
            }, { new: true }
        );

        // Renvoyer la réponse
        res.send({ etudiant, utilisateur });
    } catch (err) {
        console.error(err);

        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: `etudiant non trouvé avec l'ID ${etudiantId}`,
            });
        }

        return res.status(500).send({
            message: `Erreur lors de la mise à jour du etudiant avec l'ID ${etudiantId}`,
        });
    }
};

exports.deleteEtudiant = async(req, res) => {
    try {
        await Etudiant.findByIdAndRemove(req.params.id);
        res.json({ message: "Etudiant supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};