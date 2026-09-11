const pool = require("../../config/database");

async function createReceivable({
  businessId,
  customerName,
  amountPaise,
  expectedDate,
  description,
  status,
}) {
  const query = `
    INSERT INTO receivables (
      business_id,
      customer_name,
      amount_paise,
      expected_date,
      description,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      business_id,
      customer_name,
      amount_paise,
      expected_date,
      description,
      status,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    businessId,
    customerName,
    amountPaise,
    expectedDate,
    description,
    status,
  ]);

  return result.rows[0];
}

async function findByBusinessId(businessId) {
  const query = `
    SELECT
      id,
      business_id,
      customer_name,
      amount_paise,
      expected_date,
      description,
      status,
      created_at,
      updated_at
    FROM receivables
    WHERE business_id = $1
    ORDER BY expected_date ASC NULLS LAST
  `;

  const result = await pool.query(query, [businessId]);

  return result.rows;
}

async function findById(receivableId) {
  const query = `
    SELECT
      id,
      business_id,
      customer_name,
      amount_paise,
      expected_date,
      description,
      status,
      created_at,
      updated_at
    FROM receivables
    WHERE id = $1
  `;

  const result = await pool.query(query, [receivableId]);

  return result.rows[0] || null;
}

async function updateReceivable(
  receivableId,
  {
    customerName,
    amountPaise,
    expectedDate,
    description,
    status,
  }
) {
  const query = `
    UPDATE receivables
    SET
      customer_name = $1,
      amount_paise = $2,
      expected_date = $3,
      description = $4,
      status = $5,
      updated_at = NOW()
    WHERE id = $6
    RETURNING
      id,
      business_id,
      customer_name,
      amount_paise,
      expected_date,
      description,
      status,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    customerName,
    amountPaise,
    expectedDate,
    description,
    status,
    receivableId,
  ]);

  return result.rows[0] || null;
}

async function deleteReceivable(receivableId) {
  const query = `
    DELETE FROM receivables
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [receivableId]);

  return result.rows[0] || null;
}

module.exports = {
  createReceivable,
  findByBusinessId,
  findById,
  updateReceivable,
  deleteReceivable,
};