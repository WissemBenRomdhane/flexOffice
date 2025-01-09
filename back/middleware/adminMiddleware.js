const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Non autorisé, utilisateur non authentifié" });
    }
  
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Accès interdit, vous n'êtes pas administrateur" });
    }
  
    next();
  };

  module.exports = { isAdmin };
