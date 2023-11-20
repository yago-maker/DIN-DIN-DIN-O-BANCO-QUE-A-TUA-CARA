const express = require('express');
const cadastrarUsuario = require('./controladores/usuarios/cadastrarUsuario');
const login = require('./controladores/usuarios/loginUsuario');


const rotas = express();


rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

module.exports = rotas;