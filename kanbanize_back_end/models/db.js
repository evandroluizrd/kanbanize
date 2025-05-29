const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;


//CREATE TABLE usuarios (
//  id SERIAL PRIMARY KEY,
////  nome VARCHAR(100) NOT NULL,
//  email VARCHAR(100) UNIQUE NOT NULL,
//  senha VARCHAR(255) NOT NULL,
//  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//);
