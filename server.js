const express = require("express");
const app = express();
const openai = require("openai");
require("dotenv").config();

// Clé API OpenAI
const apiKey = "IzaSyCrdB_ufr_SaBu_fapwT-apdTzwEkEFd1k";
// Initialisation du client OpenAI avec la clé API
const client = new openai.OpenAI(apiKey);
app.get("/chatbot", (req, res) => {
  // Exemple d'appel à l'API OpenAI
  const prompt = "Once upon a time";
  const params = {
    engine: "text-davinci-002",
    prompt: prompt,
    maxTokens: 50,
  };

  client.completions
    .create(params)
    .then((response) => {
      const completion = response.data.choices[0].text;
      res.send(completion);
    })
    .catch((error) => {
      console.error("Erreur lors de la génération du texte:", error);
      res
        .status(500)
        .send("Une erreur est survenue lors de la génération du texte.");
    });
});

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

const parentrouter = require("./app/routes/parent.routes.js");
const parentviewenseignantrouter = require("./app/routes/parentviewenseignant.routes.js");
const parentviewcoursrouter = require("./app/routes/parentviewcours.routes.js");
const parentviewexercicerouter = require("./app/routes/parentviewexercice.routes.js");
const parentviewtestrouter = require("./app/routes/parentviewtest.routes.js");

const adminrouter = require("./app/routes/admin.routes.js");
const adminviewenseignantrouter = require("./app/routes/adminviewenseignant.routes.js");

const authrouter = require("./app/routes/auth.routes.js");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration de la base de données
const dbConfig = require("./config/databaseConfig.js");
const port = process.env.PORT || 6000;

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
