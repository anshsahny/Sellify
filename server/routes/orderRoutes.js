import express from 'express'
import createOrder from '../controller/orderCtrl'
import protectRoute from '../middleware/authMiddleware'

const orderRoutes = express.Router()

orderRoutes.post('/', protectRoute, createOrder)

export default orderRoutes