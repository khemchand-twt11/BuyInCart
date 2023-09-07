import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slice/userApiSlice'
import { FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
// import { formatDateString } from '../../utils'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const deleteHandler = async (userId) => {
    if (window.confirm('Are You Sure, You Want To Delete User')) {
      try {
        await deleteUser(userId)
        refetch()
        toast.success('User Deleted')
      } catch (err) {
        toast.error(err?.data?.message || err?.message)
      }
    }
  }
  return (
    <div className='min-h-[80vh] w-11/12 mx-auto mt-10 p-6'>
      {isDeleting && <Loader />}
      <h1 className='text-2xl font-semibold  text-gray-500 mb-10 '>Users</h1>
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
                className='px-6 py-3  text-center  font-medium text-gray-500 uppercase tracking-wider'
              >
                ID
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center  font-medium text-gray-500 uppercase tracking-wider'
              >
                NAME
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center  font-medium text-gray-500 uppercase tracking-wider'
              >
                EMAIL
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center font-medium text-gray-500 uppercase tracking-wider'
              >
                ADMIN
              </th>

              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Details</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {user._id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {user.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {user.isAdmin ? (
                    <div className='flex justify-center'>
                      <FaCheck className='text-green-500 ' />
                    </div>
                  ) : (
                    <div className='flex justify-center'>
                      <FaTimes className='text-red-500' />
                    </div>
                  )}
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <div className='flex justify-around items-center'>
                    <Link
                      to={`/admin/user/${user._id}/edit`}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      <FaEdit className='text-black' />
                    </Link>
                    <button
                      className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserListScreen
