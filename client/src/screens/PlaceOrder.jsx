import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from '../slice/orderApiSlice'
import { clearCartItems } from '../slice/cartSlice'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      console.log(res)
      navigate(`/order/${res._id}`)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='grid grid-cols-12 mt-10 mb-20'>
        <div className='col-span-9'>
          <div className='flex justify-center mt-8'>
            <div className='w-3/4'>
              <h2 className='text-2xl font-semibold mb-4'>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className='flex justify-center mt-6'>
            <div className='w-3/4'>
              <h2 className='text-2xl font-semibold mb-4'>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <div className='flex justify-center mt-6'>
            <div className='w-3/4'>
              <h2 className='text-2xl font-semibold mb-4'>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className='divide-y divide-gray-300'>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className='py-4'>
                      <div className='flex items-center'>
                        <div className='w-1/12'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-full rounded-md'
                          />
                        </div>
                        <div className='w-4/12 ml-4'>
                          <Link
                            to={`/singleproduct/${item._id}`}
                            className='text-blue-500 hover:underline'
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className='w-7/12 text-right font-medium'>
                          {item.qty} x Rs. {item.price} = Rs.{' '}
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-3'>
          <div className='flex justify-center mt-6'>
            <div>
              <div className='bg-white shadow-md rounded-md p-6'>
                <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
                <div className='mb-2'>
                  <div className='flex justify-between'>
                    <span>Items</span>
                    <span>Rs. {cart.itemsPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>Rs. {cart.shippingPrice}</span>
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>Rs. {cart.taxPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='flex justify-between'>
                    <span>Total</span>
                    <span>Rs. {cart.totalPrice}</span>
                  </div>
                </div>
                {error && (
                  <div className='mb-2'>
                    <Message variant='danger'>{error.data.message}</Message>
                  </div>
                )}
                <div className='mt-4'>
                  <button
                    type='button'
                    className={`w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 ${
                      cart.cartItems.length === 0 ? 'cursor-not-allowed' : ''
                    }`}
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                  {isLoading && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen
