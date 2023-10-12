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
const getStoreAverageSalary = async(store_id) => {
  const {rows} = await pool.query('SELECT AVG(t.salary) AS average_salary FROM (SELECT delivery.salary FROM delivery WHERE store_id = $1 UNION ALL SELECT staff.salary FROM staff WHERE store_id = $1 ) t', [store_id]);
  return rows
}
const getStoreHighestSalary = async (store_id) => {
  const {rows} = await pool.query('SELECT MAX(t.SALARY) as max_salary FROM (SELECT delivery.salary FROM delivery WHERE store_id = $1 UNION ALL SELECT staff.salary FROM staff WHERE store_id = $1) t',[store_id]);
  return rows;
}
const getStoreLowestSalary = async (store_id) => {
  const {rows} = await pool.query('SELECT MIN(t.SALARY) as min_salary FROM (SELECT delivery.salary FROM delivery WHERE store_id = $1 UNION ALL SELECT staff.salary FROM staff WHERE store_id = $1) t',[store_id]);
  return rows;
}
module.exports = {
  Get,
  GetAll,
  Create,
  Delete,
  DeleteAll,
  Update,
  getStoreAverageSalary,
  getStoreHighestSalary,
  getStoreLowestSalary
};
