const pool = require("../../conexao");

const atualizarTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = req.usuario.id;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    const querySelect =
      "select * from transacoes where usuario_id = $1 and id = $2";

    const transacao = await pool.query(querySelect, [idUsuario, id]);

    if (transacao.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma transação com o id informado encontrada." });
    }

    if (!descricao) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar a descrição da transação." });
    }

    if (!valor) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar o valor da transação." });
    }

    if (!data) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar a data da transação." });
    }

    if (!categoria_id) {
      return res.status(400).json({
        mensagem: "É necessário informar o id da categoria da transação.",
      });
    }

    if (!tipo) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar o tipo da transação." });
    }

    const categoria = await pool.query(
      "select * from categorias where id = $1",
      [categoria_id]
    );

    if (categoria.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma categoria encontrada com o id informado." });
    }

    if (!(tipo === "entrada" || tipo === "saida")) {
      return res.status(400).json({
        mensagem:
          "O tipo da transação informado não é válido, os tipos de transações aceitáveis são de saída e entrada.",
      });
    }

    const queryUpdate = `update transacoes set 
    descricao = $1, valor = $2, data = $3, categoria_id = $4, usuario_id = $5, tipo = $6 where id = $7`;

    const atualizarTransacao = await pool.query(queryUpdate, [
      descricao,
      valor,
      data,
      categoria_id,
      idUsuario,
      tipo,
      id,
    ]);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = atualizarTransacao;
