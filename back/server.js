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
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/users');
const reservationsRouter = require('./routes/reservations');
const roomsRouter = require('./routes/rooms');
const officesRouter = require('./routes/offices');

app.use('/api/auth', authRoutes);
app.use('/api/users', adminRoutes);
app.use('/api/reservations', reservationsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/offices', officesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
