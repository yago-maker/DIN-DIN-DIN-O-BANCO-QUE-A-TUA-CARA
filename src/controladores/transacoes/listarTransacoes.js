const pool = require("../../conexao");

const listarTransacoes = async (req, res) => {
  try {
    const { id } = req.usuario;

    const query = "select * from transacoes where usuario_id = $1";

    const transacoes = await pool.query(query, [id]);

    return res.status(200).json(transacoes.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = listarTransacoes;
