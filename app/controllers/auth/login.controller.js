const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Utilisateur = require("../../models/utilisateur.model");

exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Recherchez l'utilisateur dans la base de données par son adresse e-mail
    const user = await Utilisateur.findOne({ email });

    console.log(user, "find");
    console.log("trouver");
    // Si l'utilisateur n'est pas trouvé, renvoyez une erreur d'authentification
    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }

    // Comparez le mot de passe fourni avec le mot de passe haché dans la base de données
    const isPasswordValid = await bcrypt.compare(
      mot_de_passe,
      user.mot_de_passe,
      (err, same) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Login not successful",
            error: "Invalid password",
          });
        } else if (same) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            email: user.email,
            role: user.role,
            nom: user.nom,
            prenom: user.prenom,
          });
        }
      }
    );
    console.log(isPasswordValid, "ispass");
    // Si le mot de passe est invalide, renvoyez une erreur d'authentification

    // Générez un jeton JWT

    // Renvoyez le token et les détails de l'utilisateur en cas de succès
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur interne du serveur
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
