const mongoose = require("mongoose");

// Définition du schéma du contenu éducatif
const contenuEducatifSchema = new mongoose.Schema({
  type_contenus: {
    type: String,
    enum: ["Cours", "Tests", "Exercice", "Devoir"],
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fichier_joint: {
    type: String,
    required: true,
  },

  trimestre: {
    type: String,
    enum: ["s1", "s2", "s3"],
    required: true,
  },
  date_pub: {
    type: Date,
    required: true,
  },
  niveau_scolaire: {
    type: String,
    required: true,
  },
  reporteur: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ContenuEducatifModel = mongoose.model(
  "ContenuEducatif",
  contenuEducatifSchema
);
module.exports = ContenuEducatifModel;
