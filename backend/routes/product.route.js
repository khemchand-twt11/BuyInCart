import express from 'express'
import {
  getProductById,
  getProducts,
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js'
import { protect, admin } from '../middlewares/auth.middleware.js'
const productRouter = express.Router()

productRouter.route('/').get(getProducts).post(protect, admin, createProduct)
productRouter
  .route('/:productId')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
productRouter.route('/:id/review').post(protect, createProductReview)

export default productRouter
