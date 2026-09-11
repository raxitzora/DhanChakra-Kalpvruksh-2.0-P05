const pool = require("../../config/database");

async function getPendingTransactions(
  businessId,
  startDate,
  endDate
) {
  const query = `
    SELECT
      id,
      amount_paise,
      transaction_date
    FROM transactions
    WHERE business_id = $1
      AND type = 'SALE'
      AND settlement_status = 'PENDING'
      AND transaction_date >= $2
      AND transaction_date < $3
    ORDER BY transaction_date ASC
  `;

  const result = await pool.query(query, [
    businessId,
    startDate,
    endDate,
  ]);

  return result.rows;
}

async function getPendingReceivables(
  businessId,
  startDate,
  endDate
) {
  const query = `
    SELECT
      id,
      amount_paise,
      expected_date
    FROM receivables
    WHERE business_id = $1
      AND status = 'PENDING'
      AND expected_date >= $2
      AND expected_date < $3
    ORDER BY expected_date ASC
  `;

  const result = await pool.query(query, [
    businessId,
    startDate,
    endDate,
  ]);

  return result.rows;
}

async function getPendingPayables(
  businessId,
  startDate,
  endDate
) {
  const query = `
    SELECT
      id,
      amount_paise,
      due_date
    FROM payables
    WHERE business_id = $1
      AND status = 'PENDING'
      AND due_date >= $2
      AND due_date < $3
    ORDER BY due_date ASC
  `;

  const result = await pool.query(query, [
    businessId,
    startDate,
    endDate,
  ]);

  return result.rows;
}

module.exports = {
  getPendingTransactions,
  getPendingReceivables,
  getPendingPayables,
};