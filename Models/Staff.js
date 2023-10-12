const pool = require("../DB/Postgres");

const Get = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM "staff" WHERE id = $1',
    [id]
  );
  const delivery = rows[0];
  return delivery;
};

const Delete = async (id) => {
  await pool.query('DELETE FROM "staff" WHERE id = $1', [id]);
};

const Create = async (delivery, id) => {
  await pool.query('INSERT INTO "staff" (name,age,salary,store_id) VALUES($1,$2)', [
    delivery.name,
    delivery.age,
    delivery.salary,
    delivery.store_id
  ]);
};
const getStoreStaff = async(store_id)=> {
    const {rows} = await pool.query('SELECT * FROM "staff" WHERE store_id = %1', [store_id]);
    return rows
}
const getStoreStaffCount = async (store_id) => {
    const {rows} = await pool.query('SELECT count(*) FROM "staff" WHERE store_id = %1', [store_id]);
    return rows[0]
}
const getStaffThatEarnsMoreThanAllDeliveries = async () => {
    const {rows} = await pool.query('SELECT * FROM staff WHERE salary > ALL (SELECT salary FROM delivery)')
    return rows
}


module.exports = {
  Get,
  Create,
  Delete,
  getStoreStaffCount,
  getStoreStaff
};