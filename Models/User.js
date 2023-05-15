const pool = require('../DB/Postgres');
const bcrypt = require('bcrypt');
const add = async (user) => {

    //Hashing user password
    const passwordHash = await bcrypt.hash(user.password, 8)

    await pool.query('INSERT INTO "user" (email,password,name) VALUES ($1,$2,$3)', [user.email, passwordHash, user.name])

    return await getByEmail(user.email);
}

const verifyCredentials = async (email, password) => {
    const {rows} = await pool.query('SELECT * FROM "user" WHERE email = $1', [email])
    const user = rows[0]
    
    if(!user) throw new Error()

    const isValid = await bcrypt.compare(password, user.password)

    if(isValid) return user

    return null
}

const get = async (id) => {
    const {rows} = await pool.query('SELECT * FROM "user" WHERE id = $1', [id])
    const user = rows[0]

    if(!user) return null

    user.password = undefined

    return user
}

const getByEmail = async (email) => {
    const {rows} = await pool.query('SELECT * FROM "user" WHERE email = $1', [email])

    const user = rows[0]
    
    if(!user) return null

    return user
}

const getAll = async () => {
    const {rows} = await pool.query('SELECT * FROM "user"')

    rows.forEach(user => {
        user.password = undefined
    })

    return rows
}

const deletee = async (id) => {
    await pool.query('DELETE FROM "user" WHERE id = $1', [id])
}

module.exports = {
    add,
    get,
    getAll,
    delete: deletee,
    getByEmail,
    verifyCredentials
}