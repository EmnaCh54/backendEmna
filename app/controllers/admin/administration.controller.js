const Utilisateur = require("../../models/utilisateur.model");
const Enseignant = require("../../models/enseignant.model");

//Consulter les Enseignants
exports.findAllEnseignants = async (req, res) => {
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
          message: `Admin not found with ID ${enseignantId}`,
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
exports.updateEnseignant = async (req, res) => {
  const enseignantId = req.params.enseignantId;

  try {
    // Mettre à jour l'enseignant avec le corps de la requête
    const enseignant = await Enseignant.findByIdAndUpdate(
      enseignantId,
      {
        utilisateur_id: req.body.utilisateur_id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        adresse: req.body.adresse,
        role: req.body.role,
        niveau_educatif: req.body.niveau_educatif,
        specialite: req.body.specialite,
        date_naissance: req.body.date_naissance,
      },
      { new: true }
    );

    if (!enseignant) {
      return res.status(404).send({
        message: `Enseignant non trouvé avec l'ID ${enseignantId}`,
      });
    }

    // Mettre à jour l'utilisateur
    const utilisateurId = enseignant.utilisateur_id;
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      utilisateurId,
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        role: req.body.role,
        date_naissance: req.body.date_naissance,
      },
      { new: true }
    );

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
        message:
          "Could not delete Enseignant with id " + req.params.enseignantId,
      });
    });
};
