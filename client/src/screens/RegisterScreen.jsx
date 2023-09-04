import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from '../slice/authSlice'
import { useRegisterMutation } from '../slice/userApiSlice'
import FormComponent from '../components/FormComponent'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  // console.log(redirect)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await register({ name, email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      console.log('err', err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <FormComponent>
      <div className='p-4 min-w-md mx-auto'>
        <h1 className='text-2xl text-center font-semibold mb-10'>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className='my-2'>
            {/* <label className='block mb-2'>Name</label> */}
            <input
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
            />
          </div>
          <div className='my-2'>
            {/* <label className='block mb-2'>Email Address</label> */}
            <input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
            />
          </div>
          <div className='my-2'>
            {/* <label className='block mb-2'>Password</label> */}
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 mt-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none'
          >
            Register
          </button>
          {isLoading && <Loader />}
        </form>
        <div className='py-3 text-center'>
          <p>
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : `/login`}
              className='text-blue-500 hover:underline'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </FormComponent>
  )
}
