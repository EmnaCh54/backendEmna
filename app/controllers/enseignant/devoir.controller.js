const ContenuEducatif = require("../../models/contenueducatif.model");
const Devoir = require("../../models/devoir.model");

// Trouver tous les devoirs avec les détails du contenu éducatif associé
exports.findAllDevoirs = async (req, res) => {
  try {
    const devoirs = await Devoir.find().populate("contenu_id");
    res.status(200).json(devoirs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Consulter un devoir par son ID avec les détails du contenu éducatif associé
exports.findOneDevoir = async (req, res) => {
  try {
    const devoir = await Devoir.findById(req.params.devoirId).populate(
      "contenu_id"
    );

    if (!devoir) {
      return res
        .status(404)
        .send({
          message: `Devoir non trouvé avec l'ID ${req.params.devoirId}`,
        });
    }

    res.json(devoir);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint pour modifier un devoir
exports.updateDevoir = async (req, res) => {
  const devoirId = req.params.devoirId;

  try {
    // Mettre à jour le devoir avec le corps de la requête
    const devoir = await Devoir.findByIdAndUpdate(
      devoirId,
      {
        contenu_id: req.body.contenu_id,
        type_contenus: req.body.type_contenus,
        titre: req.body.titre,
        description: req.body.description,
        fichier_joint: req.body.fichier_joint,
        trimestre: req.body.trimestre,
        niveau_scolaire: req.body.niveau_scolaire,
        reporteur: req.body.reporteur,
        image: req.body.image,
      },
      { new: true }
    );

    if (!devoir) {
      return res.status(404).send({
        message: `Devoir non trouvé avec l'ID ${devoirId}`,
      });
    }

    // Mettre à jour le contenu éducatif associé au devoir
    const contenu = await ContenuEducatif.findByIdAndUpdate(
      devoir.contenu_id,
      {
        type_contenus: req.body.type_contenus,
        titre: req.body.titre,
        description: req.body.description,
        fichier_joint: req.body.fichier_joint,
        trimestre: req.body.trimestre,
        niveau_scolaire: req.body.niveau_scolaire,
        reporteur: req.body.reporteur,
        image: req.body.image,
      },
      { new: true }
    );

    // Renvoyer la réponse
    res.send({ devoir, contenu });
  } catch (err) {
    console.error(err);

    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Devoir non trouvé avec l'ID ${devoirId}`,
      });
    }

    return res.status(500).send({
      message: `Erreur lors de la mise à jour du devoir avec l'ID ${devoirId}`,
    });
  }
};

// Supprimer un devoir
exports.deleteDevoir = async (req, res) => {
  try {
    const devoir = await Devoir.findByIdAndDelete(req.params.devoirId);

    if (!devoir) {
      return res
        .status(404)
        .send({
          message: `Devoir non trouvé avec l'ID ${req.params.devoirId}`,
        });
    }

    res.send({ message: "Devoir supprimé avec succès!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Télécharger un devoir par ID
exports.downloadDevoirById = async(req, res) => {
  try {
      const devoir = await Devoir.findById(req.params.devoirId);
      if (!devoir) {
          return res.status(404).send({ message: `Devoir not found with ID ${req.params.devoirId}` });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};