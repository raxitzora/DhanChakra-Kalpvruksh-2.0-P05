const pool = require("../../config/database");

async function getAvailableSales(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM transactions
    WHERE business_id = $1
      AND type = 'SALE'
      AND settlement_status IN ('AVAILABLE', 'SETTLED')
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

async function getExpenses(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM transactions
    WHERE business_id = $1
      AND type = 'EXPENSE'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

async function getWithdrawals(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM transactions
    WHERE business_id = $1
      AND type = 'WITHDRAWAL'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

async function getPendingTransactionSales(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM transactions
    WHERE business_id = $1
      AND type = 'SALE'
      AND settlement_status = 'PENDING'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

async function getPendingReceivables(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM receivables
    WHERE business_id = $1
      AND status = 'PENDING'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

async function getPendingPayables(businessId) {
  const query = `
    SELECT COALESCE(SUM(amount_paise), 0) AS total
    FROM payables
    WHERE business_id = $1
      AND status = 'PENDING'
  `;

  const result = await pool.query(query, [businessId]);

  return Number(result.rows[0].total);
}

module.exports = {
  getAvailableSales,
  getExpenses,
  getWithdrawals,
  getPendingTransactionSales,
  getPendingReceivables,
  getPendingPayables,
};