const pool = require("../../conexao");

const detalharPerfilUsuario = async (req, res) => {
  try {
    const query = "select * from usuarios where id = $1";

    const usuario = await pool.query(query, [req.usuario.id]);

    const { senha: _, ...usuarioObj } = usuario.rows[0];

    return res.status(200).json(usuarioObj);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!!!" });
  }
};

module.exports = detalharPerfilUsuario;
