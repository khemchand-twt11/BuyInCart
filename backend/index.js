import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import productRouter from './routes/product.route.js'
import {
  errorHandler,
  notFound,
} from './middlewares/errorHandler.middleware.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import orderRouter from './routes/order.route.js'
import uploadRouter from './routes/upload.route.js'
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = 8080
// app.get('/', (req, res) => {
//   res.send('Server is Working...')
// })
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use('/uploads', express.static('/var/data/uploads'))
  app.use(express.static(path.join(__dirname, '/client/dist')))

  // app.get('/service-worker.js', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'))
  // })

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
  app.get('/', (req, res) => {
    res.send('Server is running....')
  })
}
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server is running on port 8080`)
})
