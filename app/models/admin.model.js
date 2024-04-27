const mongoose = require("mongoose");
const Utilisateur = require("./utilisateur.model");

const roleSchema = new mongoose.Schema(
  {
    utilisateur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    statut: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif", // Vous pouvez définir la valeur par défaut selon vos besoins
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", roleSchema);

module.exports = Admin;
