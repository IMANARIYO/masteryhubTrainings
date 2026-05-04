import { Router } from 'express'
import {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController
} from '../controllers/userControllers.js'

const router = Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.get('/', getAllUsersController)
router.get('/:id', getUserByIdController)

export default router
