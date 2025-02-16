// routes/authRoutes.js - Routes d'authentification
const express = require('express');
const auth = require('../auth');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation basique
    if (!email || !password || !name) {
      return res.status(400).json({
        message: 'Veuillez fournir tous les champs requis',
      });
    }

    const user = await auth.register(email, password, name);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        message: 'Veuillez fournir email et mot de passe',
      });
    }

    const user = await auth.login(email, password);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;