const express = require("express");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const login = require("./controladores/usuarios/loginUsuario");
const verificacaoLogin = require("./intermediarios/verificacaoLogin");
const detalharPerfilUsuario = require("./controladores/usuarios/detalharPerfilUsuario");
const atualizarUsuario = require("./controladores/usuarios/atualizarUsuario");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificacaoLogin);

rotas.get("/usuario", detalharPerfilUsuario);
rotas.put("/usuario", atualizarUsuario);

module.exports = rotas;
