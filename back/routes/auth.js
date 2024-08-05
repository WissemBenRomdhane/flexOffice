const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.create({ email, username, password });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({ 
                _id: user._id,
                email: user.email,
                username: user.username,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password '});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = router;
