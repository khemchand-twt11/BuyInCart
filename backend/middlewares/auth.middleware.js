import asyncHandler from './asyncHandler.middleware.js'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    try {
      const user = await UserModel.findById(decoded.userId).select('-password')
      req.user = user
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized access, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

export { protect, admin }
