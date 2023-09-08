import path from 'path'
import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
const uploadRouter = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: '983568923794615',
  api_secret: 'ubnSJiNiLfSKrCcY6l_c_tTKGtA',
})
const storage = multer.memoryStorage() // Use memory storage for handling the file in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No image file provided.' })
  }

  // Upload the image to Cloudinary
  cloudinary.v2.uploader
    .upload_stream(
      { resource_type: 'auto', folder: 'BuyInCart' },
      (error, result) => {
        if (error) {
          return res.status(500).send({ message: 'Image upload failed.' })
        }

        res.status(200).send({
          message: 'Image uploaded successfully to Cloudinary',
          image: result.secure_url,
        })
      }
    )
    .end(req.file.buffer)
})

export default uploadRouter
