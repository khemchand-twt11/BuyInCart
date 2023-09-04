import express from 'express'
const orderRouter = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/order.controller.js'
import { protect, admin } from '../middlewares/auth.middleware.js'

orderRouter
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders)
orderRouter.route('/myorder').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, admin, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)
orderRouter.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default orderRouter
