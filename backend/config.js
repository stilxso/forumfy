require('dotenv').config();
const Pool = require('pg').Pool

const user = process.env.user;
const password = process.env.password;
const database = process.env.database;

const pool = new Pool({
    user: user,
    password: password,
    host: "localhost",
    port: 5432,
    database: database
})

module.exports = pool;
