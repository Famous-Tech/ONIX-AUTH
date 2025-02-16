// Point d'entrée de l'application
const express = require('express');
const cors = require('cors');
const { initDB } = require('./config');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`Serveur démarré sur le port ${PORT}`);
});
