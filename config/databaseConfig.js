module.exports = {
  url: process.env.DB_URL || "mongodb://localhost:27017/BDpi",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // d'autres options de configuration de Mongoose si nécessaire
  },
};
