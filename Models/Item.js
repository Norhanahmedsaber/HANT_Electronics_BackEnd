const pool = require("../DB/Postgres")
const getByListId = async (listId) => {
    const {rows} = await pool.query('SELECT * FROM items WHERE list_id = $1', [listId])
    return rows
}
const addItemToList = async(listId, itemId, data) => {

    await pool.query('INSERT INTO items (quantity, note, list_id, component_id, name) VALUES ($1, $2, $3, $4, $5)', [data.quantity, data.note, listId, itemId, data.name])
}
const removeItemFromList = async(itemId) => {
    await pool.query('DELETE FROM items WHERE id = $1', [itemId])
}
const update = async(id, data) => {
    await pool.query('UPDATE items SET quantity = $1, note =$2 WHERE id = $3', [data.quantity, data.note, id])
}
module.exports = {
    getByListId,
    addItemToList,
    removeItemFromList,
    update
}