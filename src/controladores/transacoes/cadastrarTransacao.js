const pool = require("../../conexao");

const cadastrarTransacao = async (req, res) => {
  try {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuario;

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

    const query = `insert into transacoes 
          (descricao, valor, data, categoria_id, usuario_id, tipo)
          values ($1, $2, $3, $4, $5, $6) returning *`;

    const transacao = await pool.query(query, [
      descricao,
      valor,
      data,
      categoria_id,
      id,
      tipo,
    ]);

    return res.status(201).json(transacao.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = cadastrarTransacao;
