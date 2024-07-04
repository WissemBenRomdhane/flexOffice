const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Charger les variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend Next.js
}));
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Routes
const reservationRoutes = require('./routes/reservations');
app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
