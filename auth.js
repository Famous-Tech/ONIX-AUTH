// auth.js - Logique d'authentification
const bcrypt = require('bcryptjs');
const { pool } = require('./config');

const auth = {
  // Inscription d'un nouvel utilisateur
  async register(email, password, name) {
    try {
      // Vérifier si l'email existe déjà
      const userExists = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userExists.rows.length > 0) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insérer le nouvel utilisateur
      const result = await pool.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, role',
        [email, hashedPassword, name]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Connexion d'un utilisateur
  async login(email, password) {
    try {
      // Vérifier si l'utilisateur existe
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error('Email ou mot de passe incorrect');
      }

      const user = result.rows[0];

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Retourner l'utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = auth;