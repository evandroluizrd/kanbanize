const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulação de "banco de dados" simples
const users = [
    {
        email: 'admin@kanbanize.com',
        password: '123456',
        role: 'admin'
    }
];

// Rota de login
const authRoutes = require('./routes/auth');
app.use(authRoutes);


// Teste simples para ver se backend está rodando
app.get('/', (req, res) => {
    res.send('Kanbanize Backend rodando!');
});

app.listen(PORT, () => {
    console.log(`Kanbanize Backend rodando na porta ${PORT}`);
});
