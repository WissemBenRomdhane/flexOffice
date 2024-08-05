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
