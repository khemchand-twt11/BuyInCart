import { Link, useParams } from 'react-router-dom'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../slice/orderApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
export default function OrderScreen() {
  const { id } = useParams()

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(id)
  console.log(id, order)
  console.log('error', error)
  return (
    <div className='min-h-[80vh]'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' />
      ) : (
        <div className='w-11/12 px-4 py-4 mt-6 mx-auto'>
          <h1 className='text-gray-500 text-3xl font-medium'>
            Order {order._id}
          </h1>
          <div className='grid grid-cols-12 mt-6 gap-12'>
            <div className='col-span-8'>
              <div className='flex items-center mb-10'>
                <div className='w-full'>
                  <h1 className='text-2xl font-medium text-gray-600 mb-2'>
                    Shipping
                  </h1>
                  <p>
                    <strong className='text-gray-700'>Name:</strong>{' '}
                    {order.user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}
                    {', '} {order.shippingAddress.city}
                    {order.shippingAddress.postalCode}
                    {', '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelievered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered Yet</Message>
                  )}
                </div>
              </div>

              <div className='flex items-center mb-6'>
                <div className='w-full'>
                  <h1 className='text-2xl font-medium text-gray-600 mb-2'>
                    Payment
                  </h1>
                  <p>
                    <strong className='text-gray-700'>Payment Method:</strong>{' '}
                    {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                    <Message variant='success'>
                      Delivered on {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Paid Yet</Message>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className='flex items-center'>
                <div className='w-full'>
                  <h1 className='text-2xl font-medium text-gray-600 mb-6'>
                    Order Items
                  </h1>
                  {order.orderItems.map((item) => (
                    <div className='flex items-center border-b-2 mb-2'>
                      <div className='w-full grid grid-cols-12 gap-4'>
                        <div className='mb-4 col-span-2 '>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='rounded'
                          />
                        </div>
                        <div className='mb-4 col-span-6 flex items-center'>
                          <Link
                            to={`/singleproduct/${item.product}`}
                            className='text-blue-500 underline'
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className='mb-4 col-span-4 flex items-center'>
                          <p className='text-gray-700'>
                            {item.qty} x Rs. {item.price} = Rs.{' '}
                            {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='col-span-4 shadow border-2 max-h-64 p-2 rounded-md'>
              <h1 className='text-gray-600 text-2xl mb-6 font-medium pt-1 pl-4'>
                Order Summary
              </h1>
              <div className='grid grid-cols-1 gap-2 mt-4 p-4'>
                <div className='flex items-center justify-between border-b-2'>
                  <div>Items</div>
                  <div>Rs. {order.itemsPrice}</div>
                </div>
                <div className='flex items-center justify-between border-b-2'>
                  <div>Shipping</div>
                  <div>Rs. {order.shippingPrice}</div>
                </div>
                <div className='flex items-center justify-between border-b-2'>
                  <div>Tax</div>
                  <div>Rs. {order.taxPrice}</div>
                </div>
                <div className='flex items-center justify-between '>
                  <div>Total</div>
                  <div>Rs. {order.totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
