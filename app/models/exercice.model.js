const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema(
  {
    contenu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContenuEducatif",
      required: true,
    },
  },
  { timestamps: true }
);

const Exercice = mongoose.model("Exercice", exerciceSchema);
module.exports = Exercice; // Exporting the Cours model
