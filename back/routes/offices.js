const express = require('express');
const router = express.Router();
const Office = require('../models/Office');

// Ajouter un bureau
router.post('/', async (req, res) => {
    const { name, description, equipment, roomId, isBooked } = req.body;
    const office = new Office({ name, description, equipment, roomId, isBooked });

    try {
        await office.save();
        res.status(201).json(office);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtenir les bureaux d'une salle spécifique
router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params; // Extraire l'ID de la salle depuis les paramètres
    try {
        const offices = await Office.find({ roomId }); // Filtrer les bureaux par roomId
        res.json(offices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;