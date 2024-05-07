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
exports.updateParent = (req, res) => {
  // Find Parent and update it with the request body
  Parent.findByIdAndUpdate(
    req.params.parentId,
    {
      relation: req.body.relation,
      pression: req.body.pression,
      utilisateur_id: req.body.utilisateur_id,
    },
    { new: true }
  )
    .then((parent) => {
      if (!parent) {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      res.send(parent);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Parent non trouvé avec l'ID " + req.params.parentId,
        });
      }
      return res.status(500).send({
        message:
          "Erreur lors de la mise à jour du Parent avec l'ID " +
          req.params.parentId,
      });
    });
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
