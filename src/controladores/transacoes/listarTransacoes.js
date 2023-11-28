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

      if (idCategoria.rows.length > 0) {
        arrayCategoriaId.push(idCategoria.rows[0].id);
      }

    }

    if (arrayCategoriaId.length === 0) {
    
      return res.status(200).json([]);
    }

   const transacoesQuery =  `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome
   FROM transacoes t
   JOIN categorias c ON t.categoria_id = c.id
   Where t.usuario_id = $1 AND t.categoria_id IN (${arrayCategoriaId.join(',')})
   `;

const transacoes = await pool.query(transacoesQuery, [id]);

    return res.status(200).json(transacoes.rows);
  } catch (error) {
    
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = listarTransacoes;
