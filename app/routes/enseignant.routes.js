const express = require("express");
const router = express.Router();

const enseignantController = require("../controllers/enseignant/configuration.controller.js");

// Routes pour les opérations CRUD sur les enseignants
router.get("/:enseignantId/profil", enseignantController.findEnseignantById);
router.get("/enseignants", enseignantController.findAllEnseignants);
router.put("/:enseignantId/profil", enseignantController.updateEnseignant);
router.put(
  "/:enseignantId/desactiver",
  enseignantController.desactiverProfilEnseignant
);
router.put(
  "/:enseignantId/reactiver",
  enseignantController.reactiverProfilEnseignant
);
router.delete(
  "/enseignants/:enseignantId",
  enseignantController.deleteEnseignant
);

module.exports = router;
