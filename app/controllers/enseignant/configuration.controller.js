const Enseignant = require("../../models/enseignant.model");
const Utilisateur = require("../../models/utilisateur.model");

exports.findAllEnseignants = async(req, res) => {
    try {
        const enseignants = await Enseignant.find().populate("utilisateur_id");

        res.status(200).json(enseignants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
//consulter enseignant ById
exports.findEnseignantById = (req, res) => {
    const enseignantId = req.params.enseignantId;

    Enseignant.findById(enseignantId)
        .populate("utilisateur_id")
        .then((Enseignant) => {
            if (!Enseignant) {
                return res.status(404).send({
                    message: `enseignant not found with ID ${enseignantId}`,
                });
            }
            res.send(Enseignant);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: `Enseignant not found with ID ${enseignantId}`,
                });
            }
            return res.status(500).send({
                message: `Error retrieving enseignant with ID ${enseignantId}`,
            });
        });
};

//mis a jour enseignant
exports.updateEnseignant = async(req, res) => {
    const enseignantId = req.params.enseignantId;

    try {
        console.log("Enseignant ID:", enseignantId);
        console.log("Requête du corps:", req.body);

        // Mettre à jour l'enseignant avec le corps de la requête
        const enseignant = await Enseignant.findByIdAndUpdate(
            enseignantId, {
                utilisateur_id: req.body.utilisateur_id,
                nom: req.body.nom,
                prenom: req.body.prenom,
                mot_de_passe: req.body.mot_de_passe,
                email: req.body.email,
                photo_profil: req.body.photo_profil,
                telephone: req.body.telephone,
                adresse: req.body.adresse,
                sexe: req.body.sexe,
                role: req.body.role,
                domaine: req.body.domaine,
                specialite: req.body.specialisation,
                matiere_principal: req.body.matiere_principal,
                date_naissance: req.body.date_naissance,
            }, { new: true }
        );

        console.log("Enseignant mis à jour:", enseignant);

        if (!enseignant) {
            return res.status(404).send({
                message: `Enseignant non trouvé avec l'ID ${enseignantId}`,
            });
        }

        // Mettre à jour l'utilisateur
        const utilisateurId = enseignant.utilisateur_id;
        const utilisateur = await Utilisateur.findByIdAndUpdate(
            utilisateurId, {
                nom: req.body.nom,
                prenom: req.body.prenom,
                mot_de_passe: req.body.mot_de_passe,
                email: req.body.email,
                photo_profil: req.body.photo_profil,
                telephone: req.body.telephone,
                adresse: req.body.adresse,
                sexe: req.body.sexe,
                role: req.body.role,
                date_naissance: req.body.date_naissance,
            }, { new: true }
        );

        console.log("Utilisateur mis à jour:", utilisateur);

        // Renvoyer la réponse
        res.send({ enseignant, utilisateur });
    } catch (err) {
        console.error(err);

        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: `Enseignant non trouvé avec l'ID ${enseignantId}`,
            });
        }

        return res.status(500).send({
            message: `Erreur lors de la mise à jour de l'enseignant avec l'ID ${enseignantId}`,
        });
    }
};

//Supprimer enseignant
exports.deleteEnseignant = (req, res) => {
    Enseignant.findByIdAndRemove(req.params.enseignantId)
        .then((enseignant) => {
            if (!enseignant) {
                return res.status(404).send({
                    message: "Enseignant not found with id " + req.params.enseignantId,
                });
            }
            res.send({ message: "Enseignant deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Enseignant not found with id " + req.params.enseignantId,
                });
            }
            return res.status(500).send({
                message: "Could not delete Enseignant with id " + req.params.enseignantId,
            });
        });
};

// Endpoint pour désactiver le profil de l'enseignant
exports.desactiverProfilEnseignant = (req, res) => {
    const enseignantId = req.params.enseignantId;

    // Désactiver l'enseignant en mettant à jour son statut
    Enseignant.findByIdAndUpdate(
            enseignantId, { statut: "inactif" }, { new: true }
        )
        .then((enseignant) => {
            if (!enseignant) {
                return res.status(404).send({
                    message: "Enseignant non trouvé avec l'ID " + enseignantId,
                });
            }
            res.send({ message: "Profil de l'enseignant désactivé avec succès" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Enseignant non trouvé avec l'ID " + enseignantId,
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la désactivation du profil de l'enseignant avec l'ID " +
                    enseignantId,
            });
        });
};

// Endpoint pour réactiver le profil de l'enseignant
exports.reactiverProfilEnseignant = (req, res) => {
    const enseignantId = req.params.enseignantId;

    // Réactiver l'enseignant en mettant à jour son statut
    Enseignant.findByIdAndUpdate(enseignantId, { statut: "actif" }, { new: true })
        .then((enseignant) => {
            if (!enseignant) {
                return res.status(404).send({
                    message: "Enseignant non trouvé avec l'ID " + enseignantId,
                });
            }
            res.send({ message: "Profil de l'enseignant réactivé avec succès" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Enseignant non trouvé avec l'ID " + enseignantId,
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la réactivation du profil de l'enseignant avec l'ID " +
                    enseignantId,
            });
        });
};