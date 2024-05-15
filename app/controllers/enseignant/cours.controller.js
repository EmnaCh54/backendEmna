const Cours = require("../../models/cours.model");
const ContenuEducatif = require("../../models/contenueducatif.model");

// Trouver tous les cours avec les détails du contenu éducatif associé
exports.findAllCours = async (req, res) => {
  try {
    const cours = await Cours.find().populate("contenu_id");

    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Consulter un cours par ID avec les détails du contenu éducatif associé
exports.findCoursById = async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.coursId).populate(
      "contenu_id"
    );

    if (!cours) {
      return res
        .status(404)
        .send({ message: `Cours non trouvé avec l'ID ${req.params.coursId}` });
    }

    res.json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint pour modifier cours
exports.updatecours = async (req, res) => {
  const coursId = req.params.coursId;

  try {
    // Mettre Ã  jour le cours avec le corps de la requÃªte
    const cours = await Cours.findByIdAndUpdate(
      coursId,
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

    if (!cours) {
      return res.status(404).send({
        message: `Cours non trouvÃ© avec l'ID ${coursId}`,
      });
    }

    // Mettre Ã  jour cours
    const contenuId = cours.contenu_id; // Correction ici
    const contenu = await ContenuEducatif.findByIdAndUpdate(
      contenuId,
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

    // Renvoyer la rÃ©ponse
    res.send({ cours, contenu });
  } catch (err) {
    console.error(err);

    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Cours non trouvÃ© avec l'ID ${coursId}`,
      });
    }

    return res.status(500).send({
      message: `Erreur lors de la mise Ã  jour du cours avec l'ID ${coursId}`,
    });
  }
};

// Supprimer un cours
exports.deleteCours = async (req, res) => {
  try {
    const cours = await Cours.findByIdAndDelete(req.params.coursId);

    if (!cours) {
      return res
        .status(404)
        .send({ message: `Cours non trouvé avec l'ID ${req.params.coursId}` });
    }

    res.send({ message: "Cours supprimé avec succès!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
