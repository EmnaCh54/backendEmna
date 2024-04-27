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
