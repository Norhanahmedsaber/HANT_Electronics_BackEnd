const pool = require("../DB/Postgres")

const create=async(component)=>{
    await pool.query('INSERT INTO "components" (name,description,catid) VALUES ($1,$2,$3)',[component.name,component.description,component.catid])
}
const getByID=async(id)=>{
    const {rows} = await pool.query('SELECT * FROM "components" WHERE id = $1', [id])
    const component = rows[0]
    return component
}
const getAll=async()=>{
    const {rows}=await pool.query('SELECT * FROM "components"')
    return rows
}
const search = async (search) => {
    const {rows} = await pool.query('SELECT * FROM components WHERE name LIKE $1', ['%'+search+'%'])
    console.log(rows)
    return rows
}
const getByCatId = async (catid) => {
   const {rows}= await pool.query('SELECT * FROM "components" WHERE catid = $1', [catid])
   return rows
}
const deleteById = async (id) => {
    await pool.query('DELETE FROM "components" WHERE id = $1', [id])
}
const deleteAll=async()=>{ 
    await pool.query('DELETE FROM "components"' )

}
const update=async(component , id)=>{
   await pool.query('UPDATE components SET (name,description,catid) VALUES ($1,$2,$3) WHERE id = $4',[component.name,component.name,component.description,component.catid,id])
}
module.exports = {
    create,
    getByID,
    getAll,
    getByCatId,
    deleteById,
    deleteAll,
    update,
    search

}