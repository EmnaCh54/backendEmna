// Capacité de stockage en Go
const stockageCapacityGB = 1;

// Variable pour suivre l'espace utilisé en bytes
let usedStorageBytes = 0;

// Contrôleur pour obtenir la capacité totale de stockage
exports.getTotalStorageCapacity = (req, res) => {
  res.status(200).json({ capacityGB: stockageCapacityGB });
};

// Contrôleur pour obtenir l'espace utilisé
exports.getUsedStorageSpace = (req, res) => {
  res.status(200).json({ usedBytes: usedStorageBytes });
};

// Contrôleur pour ajouter des données et mettre à jour l'espace utilisé
exports.addDataToStorage = (req, res) => {
  const { dataSizeBytes } = req.body;

  // Vérifier si l'ajout de données dépasse la capacité de stockage
  if (
    usedStorageBytes + dataSizeBytes >
    stockageCapacityGB * 1024 * 1024 * 1024
  ) {
    return res.status(400).json({ error: "Capacité de stockage dépassée" });
  }

  // Mettre à jour l'espace utilisé
  usedStorageBytes += dataSizeBytes;

  res.status(200).json({ message: "Données ajoutées avec succès" });
};

// Contrôleur pour supprimer des données et mettre à jour l'espace utilisé
exports.deleteDataFromStorage = (req, res) => {
  const { dataSizeBytes } = req.body;

  // Vérifier si la taille des données à supprimer est valide
  if (dataSizeBytes > usedStorageBytes) {
    return res
      .status(400)
      .json({ error: "Taille des données à supprimer invalide" });
  }

  // Mettre à jour l'espace utilisé
  usedStorageBytes -= dataSizeBytes;

  res.status(200).json({ message: "Données supprimées avec succès" });
};
