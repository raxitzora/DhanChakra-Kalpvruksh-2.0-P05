const pool = require("../../config/database");

async function getStockExpenses(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM transactions
    WHERE business_id = $1
      AND type = 'EXPENSE'
      AND category = 'STOCK'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

module.exports = {
  getStockExpenses,
};