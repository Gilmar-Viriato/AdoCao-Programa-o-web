//arquivo para conexão (módulo)
const mysql = require('mysql2');
require('dotenv').config();


//criar a conexão (credencias de acesso)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//estabelecer a conexão
db.connect(err =>{
    if (err) throw err;
    console.log("conectou ao banco!");
});

//exportar o módulo de conexão do banco de dados
module.exports = db;
