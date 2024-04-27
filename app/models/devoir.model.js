const mongoose = require("mongoose");

const devoirSchema = new mongoose.Schema(
  {
    contenu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContenuEducatif",
      required: true,
    },
  },
  { timestamps: true }
);

const Devoir = mongoose.model("Devoir", devoirSchema);

module.exports = Devoir; // Exporting the Cours model
