import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slice/userApiSlice'
import { setCredentials } from '../slice/authSlice'
import FormComponent from '../components/FormComponent'
export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  //USE EFFECT
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  //Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()

      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <FormComponent>
      <div className='p-4 min-w-md mx-auto'>
        <h1 className='text-2xl text-center font-semibold mb-10'>Sign In</h1>
        <form onSubmit={submitHandler}>
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
            Sign In
          </button>
          {isLoading && <Loader />}
        </form>
        <div className='py-3 text-center'>
          <p>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : `/register`}
              className='text-blue-500 hover:underline'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormComponent>
  )
}
