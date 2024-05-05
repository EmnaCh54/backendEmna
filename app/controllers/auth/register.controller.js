const bcrypt = require("bcrypt");
const Utilisateur = require("../../models/utilisateur.model");
const Parent = require("../../models/parent.model");
const Admin = require("../../models/admin.model");
const Enseignant = require("../../models/enseignant.model");
const Etudiant = require("../../models/etudiant.model");

exports.register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      mot_de_passe,
      email,
      adresse,
      date_naissance,
      role,
      specialite,
      niveaueducation,
      niveau_educatif,
      statut,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer un nouvel utilisateur
    const newUser = new Utilisateur({
      nom,
      prenom,
      mot_de_passe: hashedPassword,
      email,
      date_naissance,
      adresse,
      role,
      statut,
    });

    // Enregistrez l'utilisateur
    await newUser.save();
    console.log("Utilisateur enregistré :", newUser);

    switch (role) {
      case "Parent":
        const newParent = new Parent({
          etudiant_id: newUser._id,
          utilisateur_id: newUser._id,
        });
        await newParent.save();
        break;
      case "Admin":
        const newAdmin = new Admin({
          utilisateur_id: newUser._id,
        });
        await newAdmin.save();
        break;
      case "Enseignant":
        const newEnseignant = new Enseignant({
          specialite,
          niveau_educatif,
          utilisateur_id: newUser._id,
        });
        await newEnseignant.save();
        break;
      case "Etudiant":
        const newEtudiant = new Etudiant({
          niveaueducation, // This should match the field name in your model
          utilisateur_id: newUser._id,
        });
        await newEtudiant.save();
        break;
    }
    if (newUser) {
      res.status(201).json({
        message: "Inscription réussie",
        nom: newUser.nom,
        prenom: newUser.prenom,
        role: newUser.role,
      });
    } else {
      res.status(401).json({
        message: "something wen wrong ",
      });
    }
    // Retourner les informations de l'utilisateur nouvellement enregistré
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Inscription non réussie" });
  }
};
