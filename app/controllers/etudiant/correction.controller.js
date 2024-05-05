const Correction = require("../../models/correction.model");

// Trouver toutes les corrections
exports.findAllCorrections = async (req, res) => {
  try {
    const corrections = await Correction.find().populate(
      "enseignant_id",
      "nom prenom"
    );
    res.status(200).json(corrections);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la recherche des corrections." });
  }
};

// Trouver une correction par ID
exports.findCorrectionById = async (req, res) => {
  try {
    const correction = await Correction.findById(
      req.params.correctionId
    ).populate("enseignant_id", "nom prenom");
    if (!correction) {
      return res.status(404).send({
        message: `Correction non trouvée avec l'ID ${req.params.correctionId}`,
      });
    }
    res.json(correction);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la recherche de la correction." });
  }
};
// Télécharger une correction par ID
exports.downloadCorrectionById = async(req, res) => {
  try {
      const correction = await Correction.findById(req.params.correctionId);
      if (!cours) {
          return res.status(404).send({ message: `Correction not found with ID ${req.params.correctionId}` });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};