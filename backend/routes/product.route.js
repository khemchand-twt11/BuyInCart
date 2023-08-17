import express from 'express'
// import products from '../data/products.js'
import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import ProductModel from '../models/product.model.js'

const productRouter = express.Router()

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const data = await ProductModel.find({})
    res.json(data)
  })
)
productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await ProductModel.findById(id)
    res.json(product)
  })
)

export default productRouter
