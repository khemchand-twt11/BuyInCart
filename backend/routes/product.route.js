import express from 'express'
import {
  getProductById,
  getProducts,
} from '../controllers/product.controller.js'
const productRouter = express.Router()

productRouter.route('/').get(getProducts)
productRouter.route('/:productId').get(getProductById)

export default productRouter
