const pool = require ("../DB/Postgres")

const create = async(role) =>{
    await pool.query('INSERT INTO "roles" (rolename) VALUES ($1)', [role.name])

}
const getAByID = async(id) => {
    const {rows} = await pool.query('SELECT * FROM "roles" WHERE roleid= $1',[id]);
    const role = rows[0];
    if(!role) return null
    return role 
}

const getAByName = async(name) => {
    const {rows} = await pool.query('SELECT * FROM "roles" WHERE roleid $1'[name]);
    const role = rows[0];
    if(!role) return null 
    return role
}

const getAll = async()=>{
    const{rows} = await pool.query('SELECT * FROM "roles"');
    return rows;

}

const getPermission = async() => {
   
}

const deletee =  async(id)=>{
    await pool.query('DELETE FROM "roles" WHERE roleid = $1', [id])   
}

module.exports = {
    create,
    getAByName,
    getAByID,
    deletee,
    getPermission,
    getAll
}