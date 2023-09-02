import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cartImage from '../emptyCart.jpg'
import { FaArrowLeftLong } from 'react-icons/fa6'
export default function CartScreen() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cart)
  return (
    <div className='min-h-[70vh] flex justify-center items-center w-full mb-52'>
      <div className='w-10/12 md:w-4/12'>
        {cartItems.length === 0 ? (
          <div>
            <img src={cartImage} alt='' className='w-full' />
            <div className='text-center'>
              <h1 className='text-3xl font-light text-slate-500 mb-6 '>
                Empty Cart
              </h1>
              <p className='text-lg font-light mb-4'>
                Looks like you haven&apos;t made your choice yet...
              </p>
            </div>
            <Link
              to='/'
              className='underline font-bold flex items-center gap-2 text-lg justify-center'
            >
              <FaArrowLeftLong /> Continue Shopping
            </Link>
          </div>
        ) : (
          <h1>cartItems</h1>
        )}
      </div>
    </div>
  )
}
