const ContenuEducatif = require("../../models/contenueducatif.model");
const Test = require("../../models/test.model");

// Trouver tous les tests avec les détails du contenu éducatif associé
exports.findAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("contenu_id");
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Consulter un test par ID avec les détails du contenu éducatif associé
exports.findOne = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).populate("contenu_id");

    if (!test) {
      return res
        .status(404)
        .send({ message: `Test non trouvé avec l'ID ${req.params.testId}` });
    }

    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Télécharger un test par ID
exports.downloadTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res
        .status(404)
        .send({ message: `Test not found with ID ${req.params.testId}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
