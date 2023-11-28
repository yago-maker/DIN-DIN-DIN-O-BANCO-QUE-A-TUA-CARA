const pool = require("../../conexao");

const listarTransacoes = async (req, res) => {
  try {
    const { id } = req.usuario;
    const { filtro } = req.query;
    let arrayCategoriaId = [];

    for (let categoria of filtro) {
      let idCategoria = await pool.query(
        "select id from categorias where descricao ilike $1",
        [categoria]
      );
      arrayCategoriaId.push(idCategoria.rows[0].id);
    }

    let arrayTransacoes = [];

    for (let idCategoria of arrayCategoriaId) {
      let transacaoFiltrada = await pool.query("select * from transacoes where categoria_id = $1", [idCategoria])
      arrayTransacoes.push(...transacaoFiltrada.rows);
    }

    console.log(arrayTransacoes)

    const query = "select * from transacoes where usuario_id = $1";

    const transacoes = await pool.query(query, [id]);

    return res.status(200).json(transacoes.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = listarTransacoes;
