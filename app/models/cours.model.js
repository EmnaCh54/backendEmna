const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
    // Définissez votre schéma pour la table Cours
    contenu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContenuEducatif' // Référence au modèle ContenuEducatif
    },
    // Autres champs de votre schéma Cours
});

// Middleware pour intercepter l'événement de suppression d'un document Cours
coursSchema.pre('remove', async function(next) {
    try {
        // Supprimez également le document correspondant dans la table ContenuEducatif
        await this.model('ContenuEducatif').deleteOne({ _id: this.contenu_id });
        next();
    } catch (error) {
        next(error);
    }
});

const Cours = mongoose.model('Cours', coursSchema);

module.exports = Cours;