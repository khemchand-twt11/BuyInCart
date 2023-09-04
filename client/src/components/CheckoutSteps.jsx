import { Link } from 'react-router-dom'
import { FaUser, FaShippingFast, FaShoppingBag } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className='flex justify-center mt-10'>
      <div className='flex space-x-8'>
        <div
          className={`text-center ${step1 ? 'text-black' : 'text-gray-400'}`}
        >
          {step1 ? (
            <div className='flex items-center'>
              <FaUser className='inline-block mr-1 text-lg' />
              <Link to='/login' className='hover:underline'>
                Sign In
              </Link>
            </div>
          ) : (
            <div className='flex items-center'>
              <FaUser className='inline-block mr-1 text-lg' />
              <span>Sign In</span>
            </div>
          )}
        </div>

        <div
          className={`text-center ${step2 ? 'text-black' : 'text-gray-400'}`}
        >
          {step2 ? (
            <div className='flex items-center'>
              <FaShippingFast className='inline-block mr-1 text-lg' />
              <Link to='/shipping' className='hover:underline'>
                Shipping
              </Link>
            </div>
          ) : (
            <div className='flex items-center'>
              <FaShippingFast className='inline-block mr-1 text-lg' />
              <span>Shipping</span>
            </div>
          )}
        </div>

        <div
          className={`text-center ${step3 ? 'text-black' : 'text-gray-400'}`}
        >
          {step3 ? (
            <div className='flex items-center'>
              <MdPayment className='inline-block mr-1 text-lg' />
              <Link to='/payment' className='hover:underline'>
                Payment
              </Link>
            </div>
          ) : (
            <div>
              <MdPayment className='inline-block mr-1 text-lg' />

              <span>Payment</span>
            </div>
          )}
        </div>

        <div
          className={`text-center ${step4 ? 'text-black' : 'text-gray-400'}`}
        >
          {step4 ? (
            <div className='flex items-center'>
              <FaShoppingBag className='inline-block mr-1 text-lg' />
              <Link to='/placeorder' className='hover:underline'>
                Place Order
              </Link>
            </div>
          ) : (
            <div className='flex items-center'>
              <FaShoppingBag className='inline-block mr-1 text-lg' />

              <span>Place Order</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default CheckoutSteps
