const pool = require("../DB/Postgres");

const create = async (component) => {
  await pool.query(
    'INSERT INTO "components" (name,description,catid,datasheet_url) VALUES ($1,$2,$3,$4)',
    [
      component.name,
      component.description,
      component.catid,
      component.datasheet_url,
    ]
  );
};
const getByID = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM "components" WHERE id = $1',
    [id]
  );
  const component = rows[0];
  return component;
};
const getAll = async () => {
  const { rows } = await pool.query('SELECT * FROM "components" ORDER BY name');
  return rows;
};
const search = async (search) => {
  const { rows } = await pool.query(
    "SELECT * FROM components WHERE name LIKE $1 ORDER BY name",
    ["%" + search + "%"]
  );
  console.log(rows);
  return rows;
};
const getByCatId = async (catid) => {
  const { rows } = await pool.query(
    'SELECT * FROM "components" WHERE catid = $1 ORDER BY name',
    [catid]
  );
  return rows;
};
const deleteById = async (id) => {
  await pool.query('DELETE FROM "components" WHERE id = $1', [id]);
};
const deleteAll = async () => {
  await pool.query('DELETE FROM "components"');
};
const update = async (component, id) => {
  await pool.query(
    "UPDATE components SET name = $1 , description = $2, catid = $3 WHERE id = $4",
    [component.name, component.name, component.description, component.catid, id]
  );
};
module.exports = {
  create,
  getByID,
  getAll,
  getByCatId,
  deleteById,
  deleteAll,
  update,
  search,
};
