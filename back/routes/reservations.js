const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtenir toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtenir les réservations par salle et bureau
router.get('/:roomId/:officeId', async (req, res) => {
  try {
    const { roomId, officeId } = req.params;
    const reservations = await Reservation.find({ roomId, officeId });
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
