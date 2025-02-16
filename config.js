// config.js - Configuration de la base de données et des variables d'environnement
const { Pool } = require('pg');
require('dotenv').config();

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Création de la table users si elle n'existe pas
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      );
    `);
    console.log('Base de données initialisée');
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
  }
};

module.exports = { pool, initDB };