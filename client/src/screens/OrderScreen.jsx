import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../slice/orderApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
export default function OrderScreen() {
  const { id: orderId } = useParams()

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId)
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery()

  //USER INFO
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript()
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Order is paid')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }
  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } })
    refetch()

    toast.success('Order is paid')
  }

  function onError(err) {
    toast.error(err.message)
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order Delivered')
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }
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
                  {order.isDelivered ? (
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
                    <Message variant='success'>Paid on {order.paidAt}</Message>
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
                    <div
                      className='flex items-center border-b-2 mb-2'
                      key={item._id}
                    >
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
                            {(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='col-span-4 shadow border-2 max-h-fit p-2 rounded-md'>
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
                {!order.isPaid && (
                  <div className='mt-10'>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        <button
                          className='bg-gray-800 mb-4 w-full rounded py-2 text-white'
                          onClick={onApproveTest}
                        >
                          Test Pay Order
                        </button>
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelievered && (
                    <div>
                      <button
                        onClick={deliverHandler}
                        className='bg-gray-800 mb-4 w-full rounded py-2 text-white'
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
