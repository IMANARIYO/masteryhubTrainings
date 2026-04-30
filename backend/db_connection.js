import mysql from 'mysql2/promise'

const DB_NAME = 'mhjrdb'

const tempConn = await mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: ''
})
await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``)
await tempConn.end()

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: DB_NAME
})

export default pool
