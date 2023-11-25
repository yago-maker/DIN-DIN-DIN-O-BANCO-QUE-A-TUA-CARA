const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (!nome) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar o nome." });
    }

    if (!email) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar o email." });
    }

    if (!senha) {
      return res
        .status(400)
        .json({ mensagem: "É necessário informar a senha." });
    }

    const querySelect = "select * from usuarios where email = $1";

    const emailValido = await pool.query(querySelect, [email]);

    if (emailValido.rowCount > 0) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryUpdate =
      "update usuarios set nome = $1, email = $2, senha = $3 where id = $4";

    const atualizar = await pool.query(queryUpdate, [
      nome,
      email,
      senhaCriptografada,
      id,
    ]);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!!!" });
  }
};

module.exports = atualizarUsuario;
