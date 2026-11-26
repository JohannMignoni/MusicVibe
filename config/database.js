// Serve apenas para conexão e configuração
// arquivo: config/database.js

// Carrega a classe 'Sequelize' do módulo 'sequelize
const { Sequelize } = require('sequelize');
// Carrega as variáveis de ambiente através do módulo 'dotev'
require('dotenv').config();

// Cria uma insância da classe 'Sequelize'
const sequelize = new Sequelize(
    // Variáveis carregadas do arquivo .env
    // Sobre o banco de dados
    process.env.DB_NAME,       // Nome do DB
    process.env.DB_USER,       // Nome do user
    process.env.DB_PASSWORD,   // Senha do user
    {
        // Sobre o servidor
        host: process.env.DB_HOST,  // Endereço do servidor do DB
        port: process.env.DB_PORT,  // Porta do servidor do DB
        dialect: 'mysql',           // Tipo do DB
        logging: false,             // Liga/desliga o log de SQL no terminal
        define: {
            timestamps: true,       // Cria os campos createAt e updateAt
            underscored: true       // Usa a forma created_at e updated_at
        }
    }
);

module.exports = sequelize;