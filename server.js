const express = require("express");
const app = express();
const openai = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Clé API OpenAI
const apiKey = process.env.OPENAI_API_KEY;

// Initialisation du client OpenAI avec la clé API

const client = new openai.OpenAI({
  apiKey: "AIzaSyDdAijyyfP3j8rc_18ofel55LflA3i-2Ro",
});

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GeminaiKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Route pour le chatbot
// Route pour le chatbot
app.get("/chatbot", async (req, res) => {
  try {
    const { prompt } = req.body; // Extracting prompt from request body

    // Check if prompt is provided
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call the generateContent method with the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;

    // Check if response is empty or undefined
    if (!response || response.text().trim() === "") {
      return res.send({
        response: "Désolé, pas de réponse pour cette question.",
      });
    }

    const text = response.text();

    // Send the chatbot response
    res.send({ response: text });
  } catch (error) {
    console.error("Error processing chatbot request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;

// Importation des modules de routes
const etudiantrouter = require("./app/routes/etudiant.routes.js");
const etudiantviewexercicerouter = require("./app/routes/etudiantviewexercice.routes.js");
const etudiantviewtestrouter = require("./app/routes/etudiantviewtest.routes.js");
const etudiantviewdevoirrouter = require("./app/routes/etudiantviewdevoire.routes.js");
const etudiantviewcorrectionrouter = require("./app/routes/etudiantviewcorrection.routes.js");
const etudiantviewcoursrouter = require("./app/routes/etudiantviewcours.routes.js");

const enseignantrouter = require("./app/routes/enseignant.routes.js");
const enseignantviewcoursrouter = require("./app/routes/enseignantviewcours.routes.js");
const enseignantviewcorrectionrouter = require("./app/routes/enseignantviewcorrection.routes.js");
const enseignantviewexercicerouter = require("./app/routes/enseignantviewexercice.routes.js");
const enseignantviewtestrouter = require("./app/routes/enseignantviewtest.routes.js");
const enseignantviewdevoirrouter = require("./app/routes/enseignantviewdevoir.routes.js");
const enseignantviewcontenueducatifrouter = require("./app/routes/enseignantviewcontenueducatif.routes.js");
const enseignantviewquizrouter = require("./app/routes/enseignantviewquiz.routes.js");

const parentrouter = require("./app/routes/parent.routes.js");
const parentviewenseignantrouter = require("./app/routes/parentviewenseignant.routes.js");
const parentviewcoursrouter = require("./app/routes/parentviewcours.routes.js");
const parentviewexercicerouter = require("./app/routes/parentviewexercice.routes.js");
const parentviewtestrouter = require("./app/routes/parentviewtest.routes.js");
const parentviewcorrectionrouter = require("./app/routes/parentviewcorrection.routes.js");

const adminrouter = require("./app/routes/admin.routes.js");
const adminviewenseignantrouter = require("./app/routes/adminviewenseignant.routes.js");

const authrouter = require("./app/routes/auth.routes.js");

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

// Configuration de la base de données
const dbConfig = require("./config/databaseConfig.js");
const port = process.env.PORT || 4000;

// Connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log("Connected To DB!");
  } catch (error) {
    console.error("Could not connect to the database:", error);
  }
};

// Route racine
app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World " });
});

// Routes pour l'authentification
app.use("/auth", authrouter);

// Routes pour les enseignants
app.use("/enseignant", enseignantrouter);
app.use("/enseignantviewcours", enseignantviewcoursrouter);
app.use("/enseignantviewcorrection", enseignantviewcorrectionrouter);
app.use("/enseignantviewexercice", enseignantviewexercicerouter);
app.use("/enseignantviewtest", enseignantviewtestrouter);
app.use("/enseignantviewdevoir", enseignantviewdevoirrouter);
app.use("/enseignantcontenueducatif", enseignantviewcontenueducatifrouter);
app.use("/enseignantviewquiz", enseignantviewquizrouter);

// Routes pour les étudiants
app.use("/etudiant", etudiantrouter);
app.use("/etudiantviewcours", etudiantviewcoursrouter);
app.use("/etudiantviewexercice", etudiantviewexercicerouter);
app.use("/etudiantviewtest", etudiantviewtestrouter);
app.use("/etudiantviewdevoir", etudiantviewdevoirrouter);
app.use("/etudiantviewcorrection", etudiantviewcorrectionrouter);

// Routes pour les parents
app.use("/parent", parentrouter);
app.use("/parentviewenseignant", parentviewenseignantrouter);
app.use("/parentviewcours", parentviewcoursrouter);
app.use("/parentviewexercice", parentviewexercicerouter);
app.use("/parentviewtest", parentviewtestrouter);
app.use("/parentviewcorrection", parentviewcorrectionrouter);

// Routes pour les administrateurs
app.use("/admin", adminrouter);
app.use("/adminviewenseignant", adminviewenseignantrouter);

// Démarrage du serveur
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
