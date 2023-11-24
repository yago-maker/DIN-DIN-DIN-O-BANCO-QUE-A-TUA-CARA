const express = require("express");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const login = require("./controladores/usuarios/loginUsuario");
const verificacaoLogin = require("./intermediarios/verificacaoLogin");
const detalharPerfilUsuario = require("./controladores/usuarios/detalharPerfilUsuario");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificacaoLogin);

rotas.get("/usuario", detalharPerfilUsuario);

module.exports = rotas;
