const pool = require('../DB/Postgres');
const bcrypt = require('bcrypt');

const create = async (user) => {

    //Hashing user password
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(user.password, salt)

    await pool.query('INSERT INTO "users" (email,password,username,roleid) VALUES ($1,$2,$3,$4)', [user.email, passwordHash, user.username, user.roleid])

    return await getByEmail(user.email);
}

const login = async (username, password) => {
    const {rows} = await pool.query('SELECT * FROM "users" WHERE username = $1', [username])
    let user = rows[0]
    if(!user)
    {
        const {rows} = await pool.query('SELECT * FROM "users" WHERE email = $1', [username])
         user = rows[0]
        
    }
    
    if(!user) {
        return null
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(isValid) return user

    return null
}

const getById = async (id) => {
    const {rows} = await pool.query('SELECT * FROM "users" WHERE userid = $1', [id])
    const user = rows[0]

    if(!user) return null

    user.password = undefined

    return user
}

const getByEmail = async (email) => {
    const {rows} = await pool.query('SELECT * FROM "users" WHERE email = $1', [email])

    const user = rows[0]
    
    if(!user) return null

    return user
}

const getAll = async () => {
    const {rows} = await pool.query('SELECT * FROM "users"')

    rows.forEach(user => {
        user.password = undefined
    })

    return rows
}

const deletee = async (id) => {
    await pool.query('DELETE FROM "users" WHERE userid = $1', [id])
}

module.exports = {
    create,
    getById,
    getAll,
    deletee,
    getByEmail,
    login
}