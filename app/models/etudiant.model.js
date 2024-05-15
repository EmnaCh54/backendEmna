const mongoose = require("mongoose");
const Utilisateur = require("./utilisateur.model");

const etudiantSchema = new mongoose.Schema(
  {
    niveaueducation: {
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
  },
  { timestamps: true }
);

const Etudiant = mongoose.model("Etudiant", etudiantSchema);

module.exports = Etudiant;
