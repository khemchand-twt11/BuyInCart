import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env.MONGO_URL)
const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected : ${dbConnect.connection.host}`)
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
