import {
  createUserRepository,
  getUserByEmail,
  getAllUsersRepository,
  getUserByIdRepository
} from '../repositories/usersRepository.js'
import bcrypt from 'bcrypt'
import { AppError } from '../../utils/utilsFunctions.js'

export async function createUserService (userInfo) {
  const existingUser = await getUserByEmail(userInfo.newUserEmail)
  if (existingUser) throw new AppError('User already exists', 409)

  const hashedPassword = await bcrypt.hash(userInfo.newUserPassword, 10)
  const result = await createUserRepository(
    userInfo.newUserName,
    userInfo.newUserEmail,
    hashedPassword,
    userInfo.newUserTelphone
  )

  return { id: result.insertId, username: userInfo.newUserName, email: userInfo.newUserEmail }
}

export async function loginUserService ({ email, password }) {
  const user = await getUserByEmail(email, true)
  if (!user) throw new AppError('Invalid credentials', 401)

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new AppError('Invalid credentials', 401)

  return { id: user.id, username: user.username, email: user.email }
}

export async function getAllUsersService () {
  return await getAllUsersRepository()
}

export async function getUserByIdService (id) {
  const user = await getUserByIdRepository(id)
  if (!user) throw new AppError('User not found', 404)
  return user
}
