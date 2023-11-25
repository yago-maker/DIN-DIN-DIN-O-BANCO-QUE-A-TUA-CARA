const pool = require("../../conexao");

const detalharTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = req.usuario.id;

    const query = "select * from transacoes where usuario_id = $1 and id = $2";

    const transacao = await pool.query(query, [idUsuario, id]);

    if (transacao.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma transação com o id informado encontrada." });
    }

    return res.status(200).json(transacao.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = detalharTransacao;
