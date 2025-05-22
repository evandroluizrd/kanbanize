const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());                 // Permite conexões do frontend
app.use(express.json());        // Lê JSON no corpo das requisições

app.use('/api', authRoutes);    // Rota base: /api/login e /api/cadastro

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
