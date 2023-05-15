const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "me",
    password: '0102736245',
    database: "test"
})

module.exports = pool