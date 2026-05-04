import {
  createUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService
} from '../services/usersServices.js'
import { successResponse, errorResponse } from '../../utils/utilsFunctions.js'

export const createUserController = async (req, res) => {
  const { username, email, password, telphone } = req.body
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json(errorResponse('username, email and password are required'))
    }

    const result = await createUserService({
      newUserName: username,
      newUserEmail: email,
      newUserPassword: password,
      newUserTelphone: telphone
    })
    return res
      .status(201)
      .json(successResponse('User created successfully', result))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message))
  }
}

export const loginUserController = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json(errorResponse('email and password are required'))
    }

    const result = await loginUserService({ email, password })
    return res.status(200).json(successResponse('Login successful', result))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message))
  }
}

export const getAllUsersController = async (req, res) => {
  try {
    const result = await getAllUsersService()
    return res.status(200).json(successResponse('Users fetched', result))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message))
  }
}

export const getUserByIdController = async (req, res) => {
  try {
    const result = await getUserByIdService(req.params.id)
    return res.status(200).json(successResponse('User fetched', result))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message))
  }
}
