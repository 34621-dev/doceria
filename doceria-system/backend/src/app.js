const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const doceRoutes = require('./routes/doceRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend se acessado localmente
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// Rota raiz da API para verificação de status
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'online',
    mensagem: 'API do Doceria System ativa e pronta para receber pedidos! 🍰',
    endpoints: {
      doces: '/api/doces'
    }
  });
});

// Rotas principais
app.use('/api/doces', doceRoutes);

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    erro: `A rota '${req.originalUrl}' não foi encontrada na API.`
  });
});

module.exports = app;
