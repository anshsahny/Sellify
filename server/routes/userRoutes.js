import express from 'express'
import { loginUser, registerUser, updateProfile } from '../controller/userCtrl'
import protectRoute from '../middleware/authMiddleware'

const userRoutes = express.Router()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser)
userRoutes.put('/profile/:id', protectRoute, updateProfile)

export default userRoutes