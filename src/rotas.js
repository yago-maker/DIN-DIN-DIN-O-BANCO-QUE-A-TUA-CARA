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
const atualizarTransacao = require("./controladores/transacoes/atualizarTransacao");
const excluirTransacao = require("./controladores/transacoes/excluirTransacao");
const obterExtratoTransacoes = require("./controladores/transacoes/obterExtratoTransacoes");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificacaoLogin);

rotas.get("/usuario", detalharPerfilUsuario);
rotas.put("/usuario", atualizarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", obterExtratoTransacoes);
rotas.get("/transacao/:id", detalharTransacao);
rotas.post("/transacao", cadastrarTransacao);
rotas.put("/transacao/:id", atualizarTransacao);
rotas.delete("/transacao/:id", excluirTransacao);

module.exports = rotas;
