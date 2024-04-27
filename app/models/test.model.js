const mongoose = require("mongoose");

const testsSchema = new mongoose.Schema(
  {
    contenu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContenuEducatif",
      required: true,
    },
  },
  { timestamps: true }
);

const Tests = mongoose.model("Tests", testsSchema);
module.exports = Tests; //
