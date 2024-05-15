const Utilisateur = require("../../models/utilisateur.model");

const Parent = require("../../models/parent.model");

exports.findAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate("utilisateur_id");

    res.status(200).json(parents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
//consulter parent ById
exports.findParentById = (req, res) => {
  const parentId = req.params.parentId;

  Parent.findById(parentId)
    .populate("utilisateur_id")
    .then((Parent) => {
      if (!Parent) {
        return res.status(404).send({
          message: `Admin not found with ID ${parentId}`,
        });
      }
      res.send(Parent);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Parent not found with ID ${parentId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving parent with ID ${parentId}`,
      });
    });
};

//modifier compte parent
exports.updateParent = async (req, res) => {
  const parentId = req.params.parentId;

  try {
    console.log("Parent ID:", parentId);
    console.log("Requête du corps:", req.body);

    // Mettre à jour parent avec le corps de la requête
    const parent = await Parent.findByIdAndUpdate(
      parentId,
      {
        utilisateur_id: req.body.utilisateur_id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        adresse: req.body.adresse,
        role: req.body.role,
        etudiant_id: req.body.etudiant_id,
        date_naissance: req.body.date_naissance,
      },
      { new: true }
    );

    console.log("Parent mis à jour:", parent);

    if (!parent) {
      return res.status(404).send({
        message: `Parent non trouvé avec l'ID ${parentId}`,
      });
    }

    // Mettre à jour l'utilisateur
    const utilisateurId = parent.utilisateur_id;
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      utilisateurId,
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        adresse: req.body.adresse,
        role: req.body.role,
        date_naissance: req.body.date_naissance,
      },
      { new: true }
    );

    console.log("Utilisateur mis à jour:", utilisateur);

    // Renvoyer la réponse
    res.send({ parent, utilisateur });
  } catch (err) {
    console.error(err);

    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Parent non trouvé avec l'ID ${parentId}`,
      });
    }

    return res.status(500).send({
      message: `Erreur lors de la mise à jour de Parent avec l'ID ${parentId}`,
    });
  }
};

exports.deleteParent = (req, res) => {
  Parent.findByIdAndRemove(req.params.parentId)
    .then((parent) => {
      if (!parent) {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      res.send({ message: "Parent supprimé avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de supprimer le Parent avec l'ID " + req.params.parentId,
      });
    });
};

// Disable Parent account
exports.disableParentAccount = (req, res) => {
  Parent.findByIdAndUpdate(
    req.params.parentId,
    { statut: "inactif" },
    { new: true }
  )
    .then((parent) => {
      if (!parent) {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      res.send({ message: "Compte Parent désactivé avec succès" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      return res.status(500).send({
        message:
          "Erreur lors de la désactivation du compte Parent avec l'ID " +
          req.params.parentId,
      });
    });
};

// Enable Parent account
exports.enableParentAccount = (req, res) => {
  Parent.findByIdAndUpdate(
    req.params.parentId,
    { statut: "actif" },
    { new: true }
  )
    .then((parent) => {
      if (!parent) {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      res.send({ message: "Compte Parent réactivé avec succès" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      return res.status(500).send({
        message:
          "Erreur lors de la réactivation du compte Parent avec l'ID " +
          req.params.parentId,
      });
    });
};
