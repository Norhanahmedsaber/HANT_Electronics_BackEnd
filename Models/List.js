const pool = require("../DB/Postgres")

const create = async (list, userId) => {
    const { rows, rowCount } = await pool.query('INSERT INTO "lists" (name,note) VALUES ($1,$2) RETURNING id',[list.name, list.note]);
    if(rowCount > 0) {
        await pool.query('INSERT INTO "users_lists" (user_id, list_id) VALUES ($1,$2)',[userId, rows[0].id])
    }
}
const deleteByIdAdmin = async (id) => {
    const { rowCount } = await pool.query('DELETE FROM "users_lists" WHERE list_id = $1',[id])
    await pool.query('DELETE FROM lists WHERE id = $1', [id])
    
}
const deleteByIdUser = async (id, userId) => {
    await pool.query('DELETE FROM "users_lists" WHERE list_id = $1 AND user_id = $2', [id, userId])
}
const getUsersList = async(userId) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1', [userId]);
    let lists = []
    for(let i=0;i<rows.length;i++) {
        const list = await pool.query('SELECT * FROM lists WHERE id = $1', [rows[i].list_id]);
        list.rows[0].fav = rows[i].fav
        lists = lists.concat(list.rows[0])
    }
    return lists
}
const getById = async(listId, userId) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1 AND list_id=$2', [userId, listId]);
    if(rowCount > 0) {
        const list = await pool.query('SELECT * FROM lists WHERE id = $1', [rows[0].list_id]);
        list.rows[0].fav = rows[0].fav
        return list.rows
    }

}
const setAsFav = async(listId, userId) => {
    const { rows, rowCount } = await pool.query('UPDATE users_lists SET fav = $1 WHERE user_id = $2 AND list_id = $3', ['Y',userId, listId]);
}
const removeFromFav = async(listId, userId) => {
    const { rows, rowCount } = await pool.query('UPDATE users_lists SET fav = $1 WHERE user_id = $2 AND list_id = $3', ['N',userId, listId]);
}
const getFavs = async (userId) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1 AND fav = $2', [userId, 'Y']);
    let lists = []
    for(let i=0;i<rows.length;i++) {
        const list = await pool.query('SELECT * FROM lists WHERE id = $1', [rows[i].list_id]);
        list.rows[0].fav = rows[i].fav
        lists = lists.concat(list.rows[0])
    }
    return lists
}
module.exports = {
    create,
    deleteByIdAdmin,
    deleteByIdUser,
    getUsersList,
    getById,
    setAsFav,
    removeFromFav,
    getFavs
}