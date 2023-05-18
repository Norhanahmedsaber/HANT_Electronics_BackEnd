const pool = require("../DB/Postgres")

const createCircuit = async(userId, data) => {
    const {rows, rowCount} = await pool.query('INSERT INTO "lists" (name, note, circuit) VALUES ($1, $2, $3) RETURNING id', [data.name, data.note, "Y"])
    if(rowCount > 0) {
        await pool.query('INSERT INTO "users_lists" (name, note, list_id, user_id) VALUES ($1,$2,$3,$4)',[data.name, data.note, rows[0].id, userId])
    }
}

const deleteCircuit = async (circuitId) => {
    await pool.query('DELETE FROM items WHERE user_list_id = $1', [circuitId])
    const {rows, rowCount} = await pool.query('DELETE FROM "users_lists" WHERE id = $1 RETURNING list_id',[circuitId])
    if(rowCount > 0) {
        await pool.query('DELETE FROM lists WHERE id = $1', [rows[0].list_id])
    }    
}

const updateCircuit = async (circuitId, data) => {
    const {rows, rowCount} = await pool.query('UPDATE "users_lists" SET name = $1, note = $2 WHERE id = $3 RETURNING list_id',[data.name, data.note, circuitId])
    if(rowCount > 0) {
        await pool.query('UPDATE "lists" SET name = $1, note = $2 WHERE id = $3', [data.name, data.note,rows[0].list_id])
    }
}
const getById = async (id) => {
        const {rows:rows2, rowCount:rowCount2} = await pool.query('SELECT * FROM users_lists WHERE id = $1', [id]);
        return rows2[0]
}
const getAllCircuits = async() => {
    const {rows, rowCount} = await pool.query('SELECT id FROM lists WHERE circuit = $1', ["Y"])
    if(rowCount > 0) {
        let lists = []
        for(let i=0;i<rows.length;i++){
            const {rows:rows1} = await pool.query('SELECT * FROM users_lists WHERE list_id = $1', [rows[i].id])
            lists = lists.concat(rows1[0])
        }
        return lists;
    }
}
const searchCircuits = async(search) => {
    const {rows} = await pool.query('SELECT * FROM lists WHERE circuit = $2 AND name LIKE $1',[`%${search}%`, "Y"])
    return rows;
}

const create = async (userId) => {
    const { rows, rowCount } = await pool.query('INSERT INTO "lists" (name,note) VALUES ($1,$2) RETURNING id',["Untitled", ""]);

    console.log(rows[0])
    if(rowCount > 0) {
        const {rows:ids} = await pool.query('INSERT INTO "users_lists" (user_id, list_id, name, note) VALUES ($1,$2,$3,$4) RETURNING id',[userId, rows[0].id, "Untitled",""])
        return ids[0].id;
    }
}
const deleteById = async (id) => {
    await pool.query('DELETE FROM items WHERE user_list_id = $1', [id])
    await pool.query('DELETE FROM "users_lists" WHERE id = $1', [id])
}
const update = async(id, data) => {
    await pool.query('UPDATE users_lists SET name = $1, note = $2 WHERE id = $3', [data.name, data.note, id])
}
const getuserLists = async(userId) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1', [userId]);
    return rows
}
const search = async(userId, search) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1 AND name LIKE $2', [userId, `%${search}%`]);
    return rows
}
const toggleFav = async(id) => {
    const {rows} = await pool.query( 'UPDATE users_lists SET fav = CASE WHEN fav = $1 THEN $2 ELSE $1 END WHERE id = $3 RETURNING fav', ['Y', 'N', id]);
    return rows[0].fav
}
const getFavs = async (userId) => {
    const { rows } = await pool.query('SELECT * FROM users_lists WHERE user_id = $1 AND fav = $2', [userId, 'Y']);
    return rows
}
const copy = async(userId, listId) => {
    const {rows, rowCount}= await pool.query('SELECT * FROM users_lists WHERE id = $1', [listId])
    const {rows:items , rowCount:itemCount} = await pool.query("SELECT * FROM items WHERE user_list_id = $1", [listId])
    if(rowCount > 0) {
        const {rows:ids} = await pool.query('INSERT INTO users_lists (name, note, user_id) VALUES ($1,$2,$3) RETURNING id', [rows[0].name, rows[0].note, userId])
        for(let i=0;i<items.length;i++) {
            await pool.query("INSERT INTO items (quantity, user_list_id, component_id) VALUES ($1,$2,$3)",[items[i].quantity, ids[0], items[i].component_id])
        }
    }
}

module.exports = {
    createCircuit,
    create,
    deleteCircuit,
    deleteById,
    updateCircuit,
    update,
    searchCircuits,
    search,
    getAllCircuits,
    getuserLists,
    getById,
    toggleFav,
    getFavs,
    copy
}