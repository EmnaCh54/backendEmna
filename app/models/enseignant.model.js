const mongoose = require("mongoose");

const enseignantSchema = new mongoose.Schema({
  specialite: {
    type: String,
    required: true,
  },
  niveau_educatif: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["actif", "inactif"],
    default: "actif",
  },
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
});

const Enseignant = mongoose.model("Enseignant", enseignantSchema);

module.exports = Enseignant;
