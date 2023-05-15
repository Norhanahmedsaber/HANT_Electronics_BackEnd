const pool = require("../DB/Postgres")

const create = async (list, userId) => {
    const { rows, rowCount } = await pool.query('INSERT INTO "lists" (name,note) VALUES ($1,$2) RETURNING id',[list.name, list.note]);
    if(rowCount > 0) {
        await pool.query('INSERT INTO "users_lists" (user_id, list_id) VALUES ($1,$2)',[userId, rows[0].id])
    }
}

module.exports = {
    create,
    // deleteById,
    // getUsersList,
    // getById,
}