const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  enseignant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
    required: true,
},
  description: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  nb_questions: [
    {
      type: String,
      required: true,
    },
  ],
  date_creation: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
