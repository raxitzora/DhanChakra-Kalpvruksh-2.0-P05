const pool = require("../../config/database");

async function createTransaction({
  businessId,
  type,
  amountPaise,
  paymentMethod,
  settlementStatus,
  category,
  description,
  transactionDate,
}) {
  const query = `
    INSERT INTO transactions (
      business_id,
      type,
      amount_paise,
      payment_method,
      settlement_status,
      category,
      description,
      transaction_date
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING
      id,
      business_id,
      type,
      amount_paise,
      payment_method,
      settlement_status,
      category,
      description,
      transaction_date,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    businessId,
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category,
    description,
    transactionDate,
  ]);

  return result.rows[0];
}

async function findByBusinessId(businessId) {
  const query = `
    SELECT
      id,
      business_id,
      type,
      amount_paise,
      payment_method,
      settlement_status,
      category,
      description,
      transaction_date,
      created_at,
      updated_at
    FROM transactions
    WHERE business_id = $1
    ORDER BY transaction_date DESC
  `;

  const result = await pool.query(query, [businessId]);

  return result.rows;
}

async function findById(transactionId) {
  const query = `
    SELECT
      id,
      business_id,
      type,
      amount_paise,
      payment_method,
      settlement_status,
      category,
      description,
      transaction_date,
      created_at,
      updated_at
    FROM transactions
    WHERE id = $1
  `;

  const result = await pool.query(query, [transactionId]);

  return result.rows[0] || null;
}

async function updateTransaction(
  transactionId,
  {
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category,
    description,
    transactionDate,
  }
) {
  const query = `
    UPDATE transactions
    SET
      type = $1,
      amount_paise = $2,
      payment_method = $3,
      settlement_status = $4,
      category = $5,
      description = $6,
      transaction_date = $7,
      updated_at = NOW()
    WHERE id = $8
    RETURNING
      id,
      business_id,
      type,
      amount_paise,
      payment_method,
      settlement_status,
      category,
      description,
      transaction_date,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category,
    description,
    transactionDate,
    transactionId,
  ]);

  return result.rows[0] || null;
}

async function deleteTransaction(transactionId) {
  const query = `
    DELETE FROM transactions
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [transactionId]);

  return result.rows[0] || null;
}

module.exports = {
  createTransaction,
  findByBusinessId,
  findById,
  updateTransaction,
  deleteTransaction,
};