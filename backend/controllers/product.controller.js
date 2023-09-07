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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new ProductModel({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sampleproduct.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await ProductModel.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, createProduct, updateProduct }
