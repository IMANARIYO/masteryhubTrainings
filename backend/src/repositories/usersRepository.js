import { getPool } from '../../db_connection.js'

export async function createUserRepository (newUserName, newUserEmail, newUserPassword, newUserTelphone) {
  const [result] = await getPool().query(
    'INSERT INTO users (username, email, password, telephone) VALUES (?, ?, ?, ?)',
    [newUserName, newUserEmail, newUserPassword, newUserTelphone]
  )
  return result
}

export async function getUserByEmail (email, withPassword = false) {
  const fields = withPassword ? 'id, username, email, password' : 'id, username, email'
  const [rows] = await getPool().query(`SELECT ${fields} FROM users WHERE email = ? LIMIT 1`, [email])
  return rows[0] || null
}

export async function getAllUsersRepository () {
  const [rows] = await getPool().query('SELECT id, username, email, telephone FROM users')
  return rows
}

export async function getUserByIdRepository (id) {
  const [rows] = await getPool().query('SELECT id, username, email, telephone FROM users WHERE id = ? LIMIT 1', [id])
  return rows[0] || null
  
}
