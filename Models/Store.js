const pool = require("../DB/Postgres");

const GetAll = async () => {
  const { rows } = await pool.query('SELECT * FROM "stores"');
  return rows;
};

const Get = async (id) => {
  const { rows } = await pool.query('SELECT * FROM "stores" WHERE id = $1', [
    id,
  ]);
  const store = rows[0];
  return store;
};

const Delete = async (id) => {
  await pool.query('DELETE FROM "stores" WHERE id = $1', [id]);
};

const Create = async (store) => {
  await pool.query(
    'INSERT INTO "stores" (name,location,img_url) VALUES($1,$2,$3)',
    [store.name, store.location, store.img_url]
  );
};

const DeleteAll = async () => {
  await pool.query('DELETE FROM "stores"');
};

const Update = async (store, id) => {
  await pool.query(
    'UPDATE "stores" SET (name,location,img_url) VALUES($1,$2,$3) WHERE id = $4',
    [store.name, store.location, store.img_url, id]
  );
};

module.exports = {
  Get,
  GetAll,
  Create,
  Delete,
  DeleteAll,
  Update,
};
