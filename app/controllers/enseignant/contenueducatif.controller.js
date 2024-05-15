const ContenuEducatif = require("../../models/contenueducatif.model");
const Cours = require("../../models/cours.model");
const Exercice = require("../../models/exercice.model");
const Tests = require("../../models/test.model");
const moment = require("moment");
const Devoir = require("../../models/devoir.model");
const Correction = require("../../models/correction.model");
// Créer et enregistrer un nouveau contenu éducatif
exports.create = async (req, res) => {
  try {
    // Extraction des données de la requête
    const {
      titre,
      type_contenus,
      description,
      trimestre,
      niveau_scolaire,
      reporteur,
      fichier_joint,
      image,
    } = req.body;

    // Création d'un nouvel objet contenu éducatif
    const newContenuEducatif = new ContenuEducatif({
      titre,
      type_contenus,
      description,
      trimestre,
      date_pub: Date.now(), // Utilisation de la date parsée
      niveau_scolaire,
      reporteur,
      fichier_joint,
      image,
    });

    // Enregistrement du contenu éducatif
    await newContenuEducatif.save();
    console.log("Contenu enregistré :", newContenuEducatif);

    let newAssociatedItem;

    // Vérification du type de contenu et création de l'élément associé
    switch (type_contenus) {
      case "Cours":
        newAssociatedItem = new Cours({
          cours_id: newContenuEducatif._id,
          contenu_id: newContenuEducatif._id,
        });
        break;
      case "Exercice":
        newAssociatedItem = new Exercice({
          exercice_id: newContenuEducatif._id,
          contenu_id: newContenuEducatif._id,
        });
        break;
      case "Devoir":
        newAssociatedItem = new Devoir({
          devoir_id: newContenuEducatif._id,
          contenu_id: newContenuEducatif._id,
        });
        break;
      case "Tests":
        newAssociatedItem = new Tests({
          tests_id: newContenuEducatif._id,
          contenu_id: newContenuEducatif._id,
        });
        break;
        break;
      case "Correction":
        newAssociatedItem = new Correction({
          correction_id: newContenuEducatif._id,
          contenu_id: newContenuEducatif._id,
        });
      default:
        // Si le type de contenu n'est pas pris en charge, renvoyer une erreur
        return res
          .status(400)
          .json({ message: "Type de contenu non pris en charge" });
    }

    // Enregistrement de l'élément associé s'il existe
    if (newAssociatedItem) {
      await newAssociatedItem.save();
    }

    // Retourner les informations du contenu éducatif nouvellement enregistré
    res.status(201).json({
      message: "Contenu éducatif créé avec succès",
      titre: newContenuEducatif.titre,
      niveau_scolaire: newContenuEducatif.niveau_scolaire,
      type_contenus: newContenuEducatif.type_contenus,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur interne du serveur", error: error.message });
  }
};
