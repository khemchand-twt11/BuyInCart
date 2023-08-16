import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import UserModel from './models/user.model.js'
import OrderModel from './models/order.model.js'
import ProductModel from './models/product.model.js'
import users from './data/users.js'
import products from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await UserModel.deleteMany()
    await OrderModel.deleteMany()
    await ProductModel.deleteMany()

    const createdUsers = await UserModel.insertMany(users)

    const admin = createdUsers[0]._id

    const createdProducts = products.map((product) => {
      return { ...product, user: admin }
    })

    await ProductModel.insertMany(createdProducts)
    console.log('Data Imported Successfully!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await UserModel.deleteMany()
    await OrderModel.deleteMany()
    await ProductModel.deleteMany()

    console.log(`Data Deleted Successfully!`.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

process.argv[2] === '-i' ? importData() : deleteData()
// console.log(process.argv[2])
