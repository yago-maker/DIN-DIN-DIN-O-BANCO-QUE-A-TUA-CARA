const pool = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../../senhaJwt");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ mensagem: "É necessário informar o email." });
  }

  if (!senha) {
    return res.status(400).json({ mensagem: "É necessário informar a senha." });
  }

  try {
    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: "Usuario não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha invalido(s)." });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioAutenticado } = usuario.rows[0];

    return res.status(200).json({ usuarioAutenticado, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
  }
};

module.exports = login;
