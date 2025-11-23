const db = require('../db');

module.exports = {
    criar: (req, res) => {
        const usuario_id = req.user.id        
        const {
            imagem_url, imagem_legenda, tipo, nome_pet, especie,
            raca, cor, telefone, genero, descricao, localizacao, status
        } = req.body;

        const sql = `
            INSERT INTO publicacao 
            (imagem_url, imagem_legenda, tipo, nome_pet, especie, raca, cor, telefone, genero, descricao, localizacao, status, usuario_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql,
            [
                imagem_url, imagem_legenda, tipo, nome_pet, especie,
                raca, cor, telefone, genero, descricao, localizacao, status || "ativo", usuario_id
            ],
            (err, result) => {
                if (err) {
                    alert("Algo deu errado!!")
                    return res.status(500).send(err);
                }

                res.status(201).json({
                    id: result.insertId,
                    message: "Publicação criada com sucesso!"
                });
            }
        );
    },

    listarPublicacaoDoUsuario: (req, res) => {
    const usuario_id = req.user.id;

    const sql = "SELECT * FROM publicacao WHERE usuario_id = ?";
    
    db.query(sql, usuario_id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
    },


    listar: (req, res) => {
        db.query("SELECT * FROM publicacao", (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },

    buscarPorId: (req, res) => {
        const { id } = req.params;

        db.query("SELECT * FROM publicacao WHERE id = ?", [id], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0)
                return res.status(404).send("Publicação não encontrada");

            res.json(results[0]);
        });
    },

    atualizar: (req, res) => {
        const { id } = req.params;
        const usuario_id = req.user.id;

        db.query(
            "SELECT usuario_id FROM publicacao WHERE id = ?",
            [id],
            (err, results) => {
                if (err) return res.status(500).send(err);
                if (results.length === 0)
                    return res.status(404).send("Não encontrada");

                if (results[0].usuario_id !== usuario_id){
                    return res.status(403).send("Sem permissão");
                }
                


                const {
                    imagem_url, imagem_legenda, tipo, nome_pet, especie,
                    raca, cor, genero, telefone, descricao, localizacao, status
                } = req.body;

                db.query(
                    `UPDATE publicacao SET imagem_url=?, imagem_legenda=?, tipo=?, nome_pet=?, especie=?, raca=?, cor=?, genero=?, telefone=?, descricao=?, localizacao=?, status=? WHERE id=?`,
                    [imagem_url, imagem_legenda, tipo, nome_pet, especie,
                    raca, cor, genero, telefone, descricao, localizacao, status, id],
                    (err2) => {
                        if (err2) return res.status(500).send(err2);
                        res.send("Atualizado com sucesso");
                    }
                );
            }
        );
    },

    deletar: (req, res) => {
        const { id } = req.params;
        const usuario_id = req.user.id;

        db.query("SELECT usuario_id FROM publicacao WHERE id = ?", [id], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0)
                return res.status(404).send("Não encontrada");

            if (results[0].usuario_id !== usuario_id)
                return res.status(403).send("Sem permissão");

            db.query("DELETE FROM publicacao WHERE id = ?", [id], (err2) => {
                if (err2) return res.status(500).send(err2);
                res.send("Publicação deletada");
            });
        });
    }
};
