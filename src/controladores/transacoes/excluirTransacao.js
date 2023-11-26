const pool = require("../../conexao");

const excluirTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = req.usuario.id;

    const querySelect =
      "select * from transacoes where usuario_id = $1 and id = $2";

    const transacao = await pool.query(querySelect, [idUsuario, id]);

    if (transacao.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma transação com o id informado encontrada." });
    }

    const queryDelete = `delete from transacoes where id = $1`;

    const excluirTransacao = await pool.query(queryDelete, [id]);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = excluirTransacao;
