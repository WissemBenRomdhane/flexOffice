const express = require('express');
const User = require('../models/User');
const generateToken = require('../middleware/authUtils');

const router = express.Router();

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (user && (await user.matchPassword(password))) {
            res.json({ 
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password '});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
