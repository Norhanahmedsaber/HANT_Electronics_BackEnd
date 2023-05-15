const pool = require('../DB/Postgres');


const create=async(category)=>{
    await pool.query('INSERT INTO "categories" (name) VALUES ($1)',[category.name])
}
const getByID=async(id)=>{
    const {rows} = await pool.query('SELECT * FROM "categories" WHERE id = $1', [id])
    const category = rows[0]
    return category
}
const getAll=async()=>{
    const {rows}=await pool.query('SELECT *FROM "categories"')
    return rows
}
const deleteById = async (id) => {
    await pool.query('DELETE FROM "categories" WHERE id = $1', [id])
}
const deleteAll=async()=>{
    await pool.query('DELETE FROM "categories"' )

}
const update=async(category , id)=>{
   await pool.query('UPDATE categories SET name = $1 WHERE id = $2',[category.name,id])
}
module.exports = {
    create,
    getByID,
    getAll,
    deleteById,
    deleteAll,
    update

}