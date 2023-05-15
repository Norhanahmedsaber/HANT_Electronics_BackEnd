const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "node",
    password: '1234',
    database: "test"
})

module.exports = pool