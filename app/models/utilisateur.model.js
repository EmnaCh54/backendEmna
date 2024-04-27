const mongoose = require("mongoose");

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  date_naissance: {
    type: String,
    //required: true,
  },
  role: {
    type: String,
    enum: ["Etudiant", "Parent", "Enseignant", "Admin"],
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // Vous pouvez également ajouter une validation d'email personnalisée ici
  },
  mot_de_passe: {
    type: String,
    required: true,
    // Vous devriez également ajouter une logique de hachage pour sécuriser le mot de passe
  },
  statut: {
    type: String,
    enum: ["actif", "inactif"],
    default: "actif",
  },
});

// Création du modèle utilisateur à partir du schéma
const UserModel = mongoose.model("Utilisateur", userSchema);

module.exports = UserModel;
