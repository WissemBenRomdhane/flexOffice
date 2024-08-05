const express = require('express');
const router = express.Router();
const Office = require('../models/Office');

// Ajouter un bureau
router.post('/', async (req, res) => {
    const { name, description, roomId, isBooked } = req.body;
    const office = new Office({ name, description, roomId, isBooked });

    try {
        await office.save();
        res.status(201).json(office);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtenir tous les bureaux
router.get('/', async (req, res) => {
    try {
        const offices = await Office.find().populate(roomId);
        res.json(offices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;