// server.js
const express = require("express");
const app = express();

//etudiant routes
const etudiantrouter = require("./app/routes/etudiant.routes.js");
const etudiantviewexercicerouter = require("./app/routes/etudiantviewexercice.routes.js");
const etudiantviewtestrouter = require("./app/routes/etudiantviewtest.routes.js");
const etudiantviewdevoirrouter = require("./app/routes/etudiantviewdevoire.routes.js");
const etudiantviewcorrectionrouter = require("./app/routes/etudiantviewcorrection.routes.js");
const etudiantviewcoursrouter = require("./app/routes/etudiantviewcours.routes.js");

//enseignant routes
const enseignantrouter = require("./app/routes/enseignant.routes.js");
const enseignantviewcoursrouter = require("./app/routes/enseignantviewcours.routes.js");
const enseignantviewcorrectionrouter = require("./app/routes/enseignantviewcorrection.routes.js");
const enseignantviewexercicerouter = require("./app/routes/enseignantviewexercice.routes.js");
const enseignantviewtestrouter = require("./app/routes/enseignantviewtest.routes.js");
const enseignantviewdevoirrouter = require("./app/routes/enseignantviewdevoir.routes.js");
const enseignantviewcontenueducatifrouter = require("./app/routes/enseignantviewcontenueducatif.routes.js");
//const enseignantviewquizrouter = require("./app/routes/enseignantviewquiz.routes.js");

//parent routes
const parentrouter = require("./app/routes/parent.routes.js");
const parentviewenseignantrouter = require("./app/routes/parentviewenseignant.routes.js");
const parentviewcoursrouter = require("./app/routes/parentviewcours.routes.js");
const parentviewexercicerouter = require("./app/routes/parentviewexercice.routes.js");
const parentviewtestrouter = require("./app/routes/parentviewtest.routes.js");

//admin routes
const adminrouter = require("./app/routes/admin.routes.js");
const adminviewenseignantrouter = require("./app/routes/adminviewenseignant.routes.js");
//authentification routes
const authrouter = require("./app/routes/auth.routes.js");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require("./config/databaseConfig.js");
const port = process.env.PORT || 6000;

const connectDB = async() => {
    try {
        // Optionnel : configuration spécifique de Mongoose
        // await mongoose.set("strictQuery", false);

        await mongoose.connect(dbConfig.url, dbConfig.options);
        console.log("Connected To DB!");
    } catch (error) {
        console.error("Could not connect to the database:", error);
        // Gérer l'erreur de manière appropriée, par exemple :
        // enregistrement des erreurs dans un fichier de journalisation
        // et arrêt gracieux du serveur si nécessaire
    }
};

app.get("/", async(req, res) => {
    return res.json({ message: "Hello, World " });
});

//les routes
app.use("/auth", authrouter);

//enseignant routes
app.use("/enseignant", enseignantrouter);
app.use("/enseignantviewcours", enseignantviewcoursrouter);
app.use("/enseignantviewcorrection", enseignantviewcorrectionrouter);
app.use("/enseignantviewexercice", enseignantviewexercicerouter);
app.use("/enseignantviewtest", enseignantviewtestrouter);
app.use("/enseignantviewdevoir", enseignantviewdevoirrouter);
app.use("/enseignantcontenueducatif", enseignantviewcontenueducatifrouter);
//app.use("/enseignantviewquiz", enseignantviewquizrouter);

//etudiant
app.use("/etudiant", etudiantrouter);
app.use("/etudiantviewcours", etudiantviewcoursrouter);
app.use("/etudiantviewexercice", etudiantviewexercicerouter);
app.use("/etudiantviewtest", etudiantviewtestrouter);
app.use("/etudiantviewdevoir", etudiantviewdevoirrouter);
app.use("/etudiantviewcorrection", etudiantviewcorrectionrouter);

//parent
app.use("/parent", parentrouter);
app.use("/parentviewenseignant", parentviewenseignantrouter);
app.use("/parentviewcours", parentviewcoursrouter);
app.use("/parentviewexercice", parentviewexercicerouter);
app.use("/parentviewtest", parentviewtestrouter);

//admin
app.use("/admin", adminrouter);
app.use("/adminviewenseignant", adminviewenseignantrouter);

const start = async() => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();