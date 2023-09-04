import express from 'express'
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'
import { protect, admin } from '../middlewares/auth.middleware.js'
const userRouter = express.Router()

userRouter.route('/').post(registerUser).get(protect, admin, getUsers)
userRouter.post('/login', loginUser)
userRouter.post('/logout', protect, logoutUser)
userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
userRouter
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

export default userRouter
