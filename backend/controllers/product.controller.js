import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import ProductModel from '../models/product.model.js'

// @desc : Fetch all products
// @request: GET api/products
// @access: public

const getProducts = asyncHandler(async (req, res) => {
  const data = await ProductModel.find({})
  res.json(data)
})

// @desc : Fetch single products
// @request: GET api/products/:id
// @access: public

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const product = await ProductModel.findById(productId)
  if (product) {
    return res.json(product)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

export { getProducts, getProductById }
