const pool = require("../../config/database");

async function findByClerkUserId(clerkUserId) {
  const query = `
    SELECT
      id,
      clerk_user_id,
      name,
      email,
      created_at,
      updated_at
    FROM users
    WHERE clerk_user_id = $1
  `;

  const result = await pool.query(query, [clerkUserId]);

  return result.rows[0] || null;
}

async function createUser({ clerkUserId, name, email }) {
  const query = `
    INSERT INTO users (
      clerk_user_id,
      name,
      email
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      clerk_user_id,
      name,
      email,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [
    clerkUserId,
    name,
    email,
  ]);

  return result.rows[0];
}

module.exports = {
  findByClerkUserId,
  createUser,
};