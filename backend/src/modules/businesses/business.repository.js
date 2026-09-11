const pool = require("../../config/database");

async function findByUserId(userId) {
  const query = `
    SELECT
      id,
      user_id,
      name,
      created_at,
      updated_at
    FROM businesses
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

async function findById(businessId) {
  const query = `
    SELECT
      id,
      user_id,
      name,
      created_at,
      updated_at
    FROM businesses
    WHERE id = $1
  `;

  const result = await pool.query(query, [businessId]);

  return result.rows[0] || null;
}

async function createBusiness({ userId, name }) {
  const query = `
    INSERT INTO businesses (
      user_id,
      name
    )
    VALUES ($1, $2)
    RETURNING
      id,
      user_id,
      name,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    userId,
    name,
  ]);

  return result.rows[0];
}

async function updateBusiness(businessId, { name }) {
  const query = `
    UPDATE businesses
    SET
      name = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING
      id,
      user_id,
      name,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    name,
    businessId,
  ]);

  return result.rows[0] || null;
}

async function deleteBusiness(businessId) {
  const query = `
    DELETE FROM businesses
    WHERE id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [businessId]);

  return result.rows[0] || null;
}

module.exports = {
  findByUserId,
  findById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};