const pool = require("../DB/Postgres");

const Get = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM "phones" WHERE store_id = $1',
    [id]
  );
  const phone = rows[0];
  return phone;
};

const Delete = async (id) => {
  await pool.query('DELETE FROM "phones" WHERE id = $1', [id]);
};

const Create = async (phone, id) => {
  await pool.query('INSERT INTO "phones" (number,store_id) VALUES($1,$2)', [
    phone.number,
    id,
  ]);
};

module.exports = {
  Get,
  Create,
  Delete,
};
