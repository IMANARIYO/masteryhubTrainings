import express from 'express'
import pool from './db_connection.js'
const app = express()

const port = 3000

const test = async () => {
  const [rows] = await pool.query('SELECT NOW()')
  console.log(rows)
}
app.use(express.json())
test()
const inserting = async (name, email, password) => {
  const [
    result
  ] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  )
  console.log(result.insertId)
}
const deleting = async () => {
  await pool.query('DELETE FROM users WHERE id = 4')
}
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name) {
    return res.send({
      status: false,
      message: ' your  name w is required1'
    })
  }
  if (!email) {
    return res.status(403).send({
      status: false,
      message: ' email  email w is required1'
    })
  }

  if (!password) {
    return res.send({
      status: false,
      message: ' password  password w is required1'
    })
  }
  console.log(
    ' am signup  and am being cllaed********************************1'
  )

  const alreadyexist = await finduserByEmail(email)

  if (alreadyexist) {
    return res.status(409).send({
      status: false,
      message: 'user with this email already exist  try  to usae another email'
    })
  }

  console.log('***********i have  exceuted  even if there no name******', name)
  inserting(name, email, password)
  return res.send({
    status: true,
    message: 'succesful registered'
  })
})

const finduserByEmail = async email => {
  console.log(' i have to cka the exisitence of the ', email)
  const [
    existingUser
  ] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

  if (existingUser.length > 0) {
    console.log('user exist')
    return true
  } else return false
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
