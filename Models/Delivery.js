const pool = require("../DB/Postgres");

const Get = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM "delivery" WHERE id = $1',
    [id]
  );
  const delivery = rows[0];
  return delivery;
};

const Delete = async (id) => {
  await pool.query('DELETE FROM "delivery" WHERE id = $1', [id]);
};

const Create = async (delivery, id) => {
  await pool.query('INSERT INTO "delivery" (name,age,salary,store_id) VALUES($1,$2)', [
    delivery.name,
    delivery.age,
    delivery.salary,
    delivery.store_id
  ]);
};
const getStoresDelivery = async(store_id)=> {
    const {rows} = await pool.query('SELECT * FROM "delivery" WHERE store_id = %1', [store_id]);
    return rows
}
const getStoreDeliveryCount = async (store_id) => {
    const {rows} = await pool.query('SELECT count(*) FROM "delivery" WHERE store_id = %1', [store_id]);
    return rows[0]
}
const getStoreTotalSalaries = async(store_id) => {
    const {rows} = await pool.query('SELECT SUM(salary) FROM "delivery" WHERE store_id = %1', [store_id]);
    return rows
}
const getOverAllDeliveryCount = async() => {
    const {rows} = await pool.query('SELECT COUNT(*) FROM "delivery"')
    return rows
}

const getAvailableDeliveriesForStore = async(store_id) => {
    const {rows} = await pool.query('SELECT * FROM "delivery" WHERE EXISTS (SELECT FROM "delivery" WHERE status = $1 AND store_id = $2) AND store_id = $2', ["Y", store_id]);
    return rows;
}
const getDeliveryThatEarnsMoreThanAnyStaffMember = async() => {
    const {rows} = await pool.query('SELECT * FROM "delivery" WHERE salary > ANY (SELECT salary FROM staff)');
    return rows;
}
module.exports = {
  Get,
  Create,
  Delete,
  getStoresDelivery,
  getAvailableDeliveriesForStore,
  getOverAllDeliveryCount,
  getStoreDeliveryCount,
  getStoreTotalSalaries,
  getDeliveryThatEarnsMoreThanAnyStaffMember
};