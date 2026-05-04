import express from 'express'
import { initDB } from './db_connection.js'
import usersRoutes from './src/routes/usersRoutes.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('Server is healthy and running!'))
app.use('/users', usersRoutes)

async function start () {
  await initDB()
  app.listen(3000, () => console.log('Server running on http://localhost:3000'))
}

start()
