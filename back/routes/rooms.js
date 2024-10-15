const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Ajouter une salle
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const room = new Room({ name, description });

  try {
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Modifier une salle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la salle', error });
  }
});

// Supprimer une salle
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Salle non trouvée' });
    }
    res.status(200).json({ message: 'Salle supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la salle', error });
  }
});

// Obtenir toutes les salles
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
