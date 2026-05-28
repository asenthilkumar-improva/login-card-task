import { Router } from 'express'
import {
  addUser,
  getAllUsers,
  getUserProfile,
  updateUserRole,
} from '../controllers/userController.js'

const router = Router()

router.get('/', getAllUsers)
router.post('/', addUser)
router.get('/:userId', getUserProfile)
router.patch('/:userId/role', updateUserRole)

export default router
