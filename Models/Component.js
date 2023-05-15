const pool = require("../DB/Postgres")

const getAll = async() => {
    const {rows} = await pool.query('SELECT * FROM "components"');
    return rows;
}


module.exports = {
    getAll
}