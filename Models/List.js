const pool = require("../DB/Postgres")

const create = async (userId) => {
    const { rows, rowCount } = await pool.query('INSERT INTO "lists" (name,note) VALUES ($1,$2) RETURNING id',["Untitled", ""]);
    if(rowCount > 0) {
        await pool.query('INSERT INTO "users_lists" (user_id, list_id) VALUES ($1,$2)',[userId, rows[0].id])
        return rows[0].id;
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
const search = async(userId, search) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1', [userId]);
    let lists = []
    for(let i=0;i<rows.length;i++) {
        const list = await pool.query('SELECT * FROM lists WHERE id = $1 AND name LIKE $2', [rows[i].list_id, '%'+search+'%']);
        if(list.rows[0]){
            list.rows[0].fav = rows[i].fav
            lists = lists.concat(list.rows[0])
        }
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
const toggleFav = async(listId, userId) => {
    const { rows, rowCount } = await pool.query( 'UPDATE users_lists SET fav = CASE WHEN fav = $1 THEN $2 ELSE $1 END WHERE user_id = $3 AND list_id = $4 RETURNING fav', ['Y','N',userId, listId]);
    return rows.fav;
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
    toggleFav,
    getFavs,
    search
}