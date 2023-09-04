import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <FormComponent>
      <div className='p-4 min-w-md mx-auto'>
        <h1 className='text-2xl text-center font-semibold mb-10'>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className='my-2'>
            <label className='block mb-2'>Email Address</label>
            <input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded-md focus:outline-none '
            />
          </div>
          <div className='my-2'>
            <label className='block mb-2'>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border rounded-md focus:outline-none '
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 mt-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none'
          >
            Sign In
          </button>
        </form>
        <div className='py-3 text-center'>
          <p>
            New Customer?{' '}
            <Link to='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormComponent>
  )
}
