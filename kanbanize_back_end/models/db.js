const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS colunas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE,
        ordem INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tarefas (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        descricao TEXT,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_vencimento DATE,
        situacao VARCHAR(100) NOT NULL,
        prioridade VARCHAR(100) NOT NULL,
        coluna_id INTEGER NULL,
        usuario_id INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notificacoes (
        id SERIAL PRIMARY KEY,
        conteudo TEXT NOT NULL,
        enviada_email BOOLEAN DEFAULT FALSE,
        lida BOOLEAN DEFAULT FALSE,
        usuario_id INTEGER NOT NULL,
        data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_usuario_notificacao
            FOREIGN KEY (usuario_id)
            REFERENCES usuarios(id)
            ON DELETE CASCADE
      );
    `);

    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
};

createTables();

module.exports = pool;
