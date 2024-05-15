const mongoose = require("mongoose");

const correctionSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    fichier_joint: { // Correction de la faute de frappe ici
        type: String,
        required: true,
    },
    enseignant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enseignant",
        required: true,
    },
    niveau_scolaire: {
        type: String,
        required: true,
      },
      trimestre: {
        type: String,
        enum: ["s1", "s2", "s3"],
        required: true,
      },
}, { timestamps: true });

const Correction = mongoose.model("Correction", correctionSchema);

module.exports = Correction;