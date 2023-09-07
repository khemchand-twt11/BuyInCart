import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'
// @desc : login user
// @request: POST api/users/login
// @access: public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (user && (await user.checkPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid name or password')
  }

  // console.log(req.body)
})

// @desc : Register user
// @request: GET api/users/
// @access: public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const ifUserExists = await UserModel.findOne({ email })

  if (ifUserExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      id: user._id,
      name,
      email,
      admin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc : logout user / clear cookie
// @request: POST api/users/logout
// @access: private

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully! ' })
})

// @desc : Get user profile
// @request: GET api/users/profile
// @access: private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc : Get user profile =
// @request: PUT api/users/profile
// @access: private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id)
  if (user) {
    user.email = req.body.email || user.email
    user.name = req.body.name || user.name
    // console.log(name)
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    console.log(updatedUser)
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      passowrd: updatedUser.password,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// FOR ADMIN

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id)

  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Can not delete admin user')
    }
    await UserModel.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}
