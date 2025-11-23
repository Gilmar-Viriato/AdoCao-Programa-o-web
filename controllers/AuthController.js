const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SENHA_SEGURA;

module.exports = {
    cadastrar: async (req, res) => {
        const { nome, email, senha } = req.body;
        const hash = await bcrypt.hash(senha, 10);

        db.query(
            'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hash],
            (err) => {
                if (err) return res.status(500).send(err);
                res.status(201).send('Usuário cadastrado');
            }
        );
    },

    login: (req, res) => {
        const { email, senha } = req.body;

        db.query(
            'SELECT * FROM usuario WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) return res.status(500).send(err);
                if (results.length === 0)
                    return res.status(404).send('Usuário não encontrado');

                const user = results[0];
                const senhaOk = await bcrypt.compare(senha, user.senha);
                if (!senhaOk) return res.status(401).send('Senha incorreta');

                const token = jwt.sign(
                    { id: user.id, nome: user.nome },
                    SECRET,
                    { expiresIn: '2h' }
                );

                res.json({ auth: true, token });
            }
        );
    }
};
