import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },

  {
    name: 'gaurav',
    email: 'gaurav@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
  {
    name: 'rishi',
    email: 'rishi@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
]

export default users
