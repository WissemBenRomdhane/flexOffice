const express = require("express");
const router = express.Router();
const User = require("../models/User");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Accès interdit" });
  }
  next();
};

// Récupérer tous les utilisateurs
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Modifier un utilisateur
router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true }
    );
    res.json(updateUser);
    if (!updateUser) {
      return res.status(404).json({ message: "Utilisateur non trouvée" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification", error });
  }
});

// Supprimer un utilisateur
router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "Utilisateur non trouvée" });
    }
    res.status(200).json({ message: "Utilisateur supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
});

module.exports = router;
