import express from 'express'
import products from './data/products.js'
import connectDB from './config/db.js'
// console.log(products)
const app = express()
connectDB()
const PORT = 8080
app.get('/', (req, res) => {
  res.send('Server is Working...')
})
app.get('/api/products', (req, res) => {
  res.send(products)
})

app.get('/api/singleproduct/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((item) => item._id == id)
  res.send(product)
})
app.listen(PORT, () => {
  console.log(`server is running on port 8080`)
})
