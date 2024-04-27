// emploiDuTemps.model.js
const mongoose = require("mongoose");

const emploiDuTempsSchema = new mongoose.Schema({
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant',
        required: true
    },
    emploi: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const EmploiDuTemps = mongoose.model("EmploiDuTemps", emploiDuTempsSchema);

module.exports = EmploiDuTemps;