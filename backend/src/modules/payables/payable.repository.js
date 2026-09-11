const pool = require("../../config/database");

async function createPayable({
  businessId,
  supplierName,
  amountPaise,
  dueDate,
  description,
  status,
}) {
  const query = `
    INSERT INTO payables (
      business_id,
      supplier_name,
      amount_paise,
      due_date,
      description,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      business_id,
      supplier_name,
      amount_paise,
      due_date,
      description,
      status,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    businessId,
    supplierName,
    amountPaise,
    dueDate,
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
      supplier_name,
      amount_paise,
      due_date,
      description,
      status,
      created_at,
      updated_at
    FROM payables
    WHERE business_id = $1
    ORDER BY due_date ASC
  `;

  const result = await pool.query(query, [businessId]);

  return result.rows;
}

async function findById(payableId) {
  const query = `
    SELECT
      id,
      business_id,
      supplier_name,
      amount_paise,
      due_date,
      description,
      status,
      created_at,
      updated_at
    FROM payables
    WHERE id = $1
  `;

  const result = await pool.query(query, [payableId]);

  return result.rows[0] || null;
}

async function updatePayable(
  payableId,
  {
    supplierName,
    amountPaise,
    dueDate,
    description,
    status,
  }
) {
  const query = `
    UPDATE payables
    SET
      supplier_name = $1,
      amount_paise = $2,
      due_date = $3,
      description = $4,
      status = $5,
      updated_at = NOW()
    WHERE id = $6
    RETURNING
      id,
      business_id,
      supplier_name,
      amount_paise,
      due_date,
      description,
      status,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    supplierName,
    amountPaise,
    dueDate,
    description,
    status,
    payableId,
  ]);

  return result.rows[0] || null;
}

async function deletePayable(payableId) {
  const query = `
    DELETE FROM payables
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [payableId]);

  return result.rows[0] || null;
}

module.exports = {
  createPayable,
  findByBusinessId,
  findById,
  updatePayable,
  deletePayable,
};