const mongoose = require("mongoose");
const Utilisateur = require("./utilisateur.model");
const Etudiant = require("./etudiant.model");

//const AssociationEnseignantEtudiantParent = require('./associationEnseignantEtudiantParent.model');

const parentSchema = new mongoose.Schema(
  {
    etudiant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
      required: true,
    },
    utilisateur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    statut: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif",
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
