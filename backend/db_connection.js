import mysql from 'mysql2/promise'

const DB_CONFIG = {
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'mhjrdb'
}

let pool = null

export async function initDB () {
  // 1. create DB if not exists (no database selected yet)
  const tempConn = await mysql.createConnection({
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password
  })
  await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\``)
  await tempConn.end()
  console.log('[DB] Database ready')

  // 2. create the pool ONCE after DB exists
  pool = mysql.createPool(DB_CONFIG)
  console.log('[DB] Connection pool created')

  // 3. create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id        INT AUTO_INCREMENT PRIMARY KEY,
      username  VARCHAR(100)  NOT NULL,
      email     VARCHAR(150)  NOT NULL UNIQUE,
      password  VARCHAR(255)  NOT NULL,
      telephone VARCHAR(20)
    )
  `)
  console.log('[DB] Tables ready')
}

export function getPool () {
  if (!pool) throw new Error('DB not initialised — call initDB() first')
  return pool
}
