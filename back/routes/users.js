const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const generateToken = require("../middleware/authUtils");

// Récupérer tous les utilisateurs
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Ajouter un utilisateur
router.post("/", protect, isAdmin, async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    const user = await User.create({ email, username, password, role });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Modifier un utilisateur
router.put("/:id", protect, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, role },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "Utilisateur non trouvée" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification", error });
  }
});

// Supprimer un utilisateur
router.delete("/:id", protect, isAdmin, async (req, res) => {
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
