const jwt = require('jsonwebtoken');
const SECRET = process.env.SENHA_SEGURA;

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};
