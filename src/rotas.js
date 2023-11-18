const express = require('express');
const cadastrarUsuario = require('./controladores/usuarios/cadastrarUsuario');


const rotas = express();


rotas.post('/usuario', cadastrarUsuario);

module.exports = rotas;