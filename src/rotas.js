const express = require("express");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const login = require("./controladores/usuarios/loginUsuario");
const verificacaoLogin = require("./intermediarios/verificacaoLogin");
const detalharPerfilUsuario = require("./controladores/usuarios/detalharPerfilUsuario");
const atualizarUsuario = require("./controladores/usuarios/atualizarUsuario");
const listarCategorias = require("./controladores/categorias/listarCategorias");
const listarTransacoes = require("./controladores/transacoes/listarTransacoes");
const detalharTransacao = require("./controladores/transacoes/detalharTransacao");
const cadastrarTransacao = require("./controladores/transacoes/cadastrarTransacao");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificacaoLogin);

rotas.get("/usuario", detalharPerfilUsuario);
rotas.put("/usuario", atualizarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/:id", detalharTransacao);
rotas.post("/transacao", cadastrarTransacao);

module.exports = rotas;
