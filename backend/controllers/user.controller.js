import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import UserModel from '../models/user.model.js'

// @desc : login user
// @request: POST api/users/login
// @access: public

const loginUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body
  const user = await UserModel.findOne({ email })
  if (user) {
    res.json({
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
  res.send('register user')
})

// @desc : logout user / clear cookie
// @request: POST api/users/logout
// @access: private

const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user')
})

// @desc : Get user profile
// @request: GET api/users/profile
// @access: private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile')
})

// @desc : Get user profile =
// @request: PUT api/users/profile
// @access: private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile')
})

// FOR ADMIN

// @desc : Get users
// @request: GET api/users
// @access: private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get all user')
})

// @desc : Get user by ID
// @request: GET api/users/:id
// @access: private/Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send('get single user')
})

// @desc : Update user
// @request: PUT api/users/:id
// @access: private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send('update single user')
})

// @desc : Delete user
// @request: DELETE api/users/:id
// @access: private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete single user')
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
