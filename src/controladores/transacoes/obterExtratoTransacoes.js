const pool = require("../../conexao");

const obterExtratoTransacoes = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;

    const queryEntrada = `select sum(valor) from transacoes where usuario_id = $1 and tipo = $2`

    const entrada = await pool.query(queryEntrada, [idUsuario, 'entrada']);

    console.log(entrada.rows);

    const querySaida = `select sum(valor) from transacoes where usuario_id = $1 and tipo = $2`

    const saida = await pool.query(querySaida, [idUsuario, 'saida']);

    if (entrada.rows[0].sum == null) {
        entrada.rows[0].sum = 0
    }

    if (saida.rows[0].sum == null) {
        saida.rows[0].sum = 0
    }

    const extrato = {
        entrada: entrada.rows[0].sum,
        saida: saida.rows[0].sum
    }
    
    return res.status(200).json(extrato);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = obterExtratoTransacoes;
