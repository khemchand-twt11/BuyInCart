import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormComponent'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slice/userApiSlice'

const UserEditScreen = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateUser({ userId, name, email, isAdmin })
      toast.success('User updated successfully')
      refetch()
      navigate('/admin/userlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  return (
    <div className='w-11/12 mx-auto p-6'>
      <Link
        to='/admin/userlist'
        className='text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded'
      >
        Go Back
      </Link>
      <FormContainer>
        <div>
          <h1 className='text-2xl font-semibold text-gray-600 mb-6'>
            Edit User
          </h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className='my-2'>
                <label htmlFor='name' className='block font-medium'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full border-2 rounded-md py-1 px-3 outline-none'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='my-2'>
                <label htmlFor='email' className='block font-medium'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full rounded-md py-1 px-3 outline-none border-2'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='my-2'>
                <label htmlFor='isAdmin' className='block font-medium'>
                  Is Admin
                </label>
                <input
                  type='checkbox'
                  id='isAdmin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className='mt-1 border-2'
                />
              </div>

              <button
                type='submit'
                className='bg-gray-600 hover:bg-gray-950 text-white py-2 px-4 rounded-md mt-4'
              >
                Update
              </button>
            </form>
          )}
        </div>
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
