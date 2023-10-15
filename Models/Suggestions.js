const pool = require("../DB/Postgres");

const getAllSuggestions = async () => {
    const { rows } = await pool.query('SELECT * FROM "suggestions" ');
    return rows;
};
  
const getAllNegativeSuggestions = async () => {
    const { rows } = await pool.query('SELECT * FROM "suggestions" WHERE type = 2');
    return rows;
}

//GET ALL (search)
const getAll = async (search, start, count) => {
    const offset = (start - 1) * count;
    if(search) {
        const { rows } = await pool.query("SELECT * FROM offers WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1 OFFSET $2 LIMIT $3", ['%'+search+'%', offset, count])
        return rows;
    }
    else {
        const { rows } = await pool.query("SELECT * FROM offers OFFSET $1 LIMIT $2", [offset, count])
        return rows;
    }
}
//GET ALL BY TAG ID
const getByTagId = async (tagId, start, count) => {
    const offset = (start - 1) * count;
    const { rows } = await pool.query("SELECT o.* FROM offers o JOIN offers_tags ot ON o.id = ot.offerid JOIN tags t ON ot.tagid = t.id WHERE t.id = $1 OFFSET $2 LIMIT $3", [tagId, offset, count])
    return rows;
}


//GET ALL BY REST ID
const getByResturantId = async (resturantId, start, count) => {
    const offset = (start - 1) * count;
    const { rows } = await pool.query("SELECT * FROM offers WHERE restaurantId = $1 OFFSET $2 LIMIT $3", [resturantId, offset, count])
    return rows;
}

module.exports = {
    getAllSuggestions,
    getAllNegativeSuggestions,
    getAll,
    getByResturantId,
    getByTagId
};
