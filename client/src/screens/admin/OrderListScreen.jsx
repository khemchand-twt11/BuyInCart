import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetOrdersQuery } from '../../slice/orderApiSlice'
import { FaTimes } from 'react-icons/fa'
// import { formatDateString } from '../../utils'

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <div className='min-h-[80vh] w-11/12 mx-auto mt-10'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-500 '>Orders</h1>
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
                USER
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center  font-medium text-gray-500 uppercase tracking-wider'
              >
                DATE
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center font-medium text-gray-500 uppercase tracking-wider'
              >
                TOTAL
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center  font-medium text-gray-500 uppercase tracking-wider'
              >
                PAID
              </th>
              <th
                scope='col'
                className='px-6 py-3  text-center font-medium text-gray-500 uppercase tracking-wider'
              >
                DELIVERED
              </th>
              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Details</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {order._id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {order.user && order.user.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  Rs. {order.totalPrice}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <span className='text-red-500'>Not Paid</span>
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {order.isDelivered ? (
                    <div className='text-center'>
                      {order.deliveredAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className='flex justify-center'>
                      <FaTimes className='text-red-500 ' />
                    </div>
                    // <span className='text-red-500'>Not Delivered</span>
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
  )
}

export default OrderListScreen
