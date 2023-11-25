const pool = require("../../conexao");


const listarCategoria = async (req, res) => {
 
try {

    const query = await pool.query('SELECT * FROM categorias')
    
   
   res.status(200).json(query.rows)

    
} catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!!!" });
}

}

module.exports = listarCategoria;