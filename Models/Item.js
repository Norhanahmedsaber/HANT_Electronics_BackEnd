const pool = require("../DB/Postgres")
const getByListId = async (listId) => {
    const {rows} = await pool.query('SELECT * FROM items WHERE user_list_id = $1', [listId])
    return rows
}
const addItemToList = async(listId, itemId, name) => {

    await pool.query('INSERT INTO items (quantity, user_list_id, component_id, name) VALUES ($1, $2, $3, $4 )', [1, listId, itemId, name])
}
const removeItemFromList = async(itemId) => {
    await pool.query('DELETE FROM items WHERE id = $1', [itemId])
}
const update = async(id, data) => {
    await pool.query('UPDATE items SET quantity = $1 WHERE id = $2', [data.quantity, id])
}
module.exports = {
    getByListId,
    addItemToList,
    removeItemFromList,
    update
} 