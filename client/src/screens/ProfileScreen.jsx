import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { setCredentials } from '../slice/authSlice'
import { useProfileMutation } from '../slice/userApiSlice'
import { useGetMyOrdersQuery } from '../slice/orderApiSlice'
import { Link } from 'react-router-dom'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector((state) => state.auth)
  const { data: orders, isLoading, error } = useGetMyOrdersQuery()
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.email, userInfo.name])

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className='container mx-auto p-4  grid grid-cols-12 min-h-[80vh] mt-10'>
      <div className='mb-8 col-span-3'>
        <h2 className='text-2xl font-semibold mb-4'>User Profile</h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              id='name'
              className='border-2 px-2 py-1 rounded'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='email'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              className='border-2 px-2 py-1 rounded'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='border-2 px-2 py-1 rounded'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='border-2 px-2 py-1 rounded'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-gray-700 hover:bg-gray-950 text-white py-2 px-4 rounded'
          >
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>

      <div className='col-span-9'>
        <h2 className='text-2xl font-semibold mb-4'>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  ID
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Total
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Paid
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Delivered
                </th>
                <th scope='col' className='relative px-6 py-3'>
                  <span className='sr-only'>Details</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{order._id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    Rs. {order.totalPrice}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <Link
                      to={`/order/${order._id}`}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProfileScreen
