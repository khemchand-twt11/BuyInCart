import express from 'express'
import connectDB from './config/db.js'
import productRouter from './routes/product.route.js'
import {
  errorHandler,
  notFound,
} from './middlewares/errorHandler.middleware.js'
connectDB()
const app = express()

const PORT = 8080
app.get('/', (req, res) => {
  res.send('Server is Working...')
})
app.use('/api/products', productRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server is running on port 8080`)
})
