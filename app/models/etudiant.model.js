const mongoose = require("mongoose");
const Utilisateur = require("./utilisateur.model");

const etudiantSchema = new mongoose.Schema({
    niveaueducation: {
        type: String,
        required: true,
    },
    statut: {
        type: String,
        enum: ["actif", "inactif"],
        default: "actif",
    },

    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }
}, { timestamps: true });

const Etudiant = mongoose.model("Etudiant", etudiantSchema);

module.exports = Etudiant;