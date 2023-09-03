import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cartImage from '../emptyCart.jpg'
import { FaArrowLeftLong, FaTrash } from 'react-icons/fa6'
import { BsArrowLeft } from 'react-icons/bs'
import { addToCart } from '../slice/cartSlice'
export default function CartScreen() {
  const cart = useSelector((state) => state.cart)
  const { cartItems, itemsPrice } = cart

  return (
    <div
      className={`min-h-[70vh] w-full mb-52 ${
        cartItems.length === 0 ? 'flex justify-center items-center' : ''
      }`}
    >
      <div className={` ${cartItems.length === 0 ? 'w-10/12 md:w-4/12' : ''}`}>
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
          <div className='w-11/12 mx-auto px-4'>
            <div className='mt-6 text-gray-600 font-medium text-lg'>
              <Link to='/' className='flex space-x-2 items-center'>
                <BsArrowLeft size={28} fontSize={18} />
                <span>Continue Shopping</span>
              </Link>
            </div>
            <h1 className='text-3xl font-bold text-gray-600 my-10'>
              Shopping Cart
            </h1>
            <div className='grid grid-cols-12 gap-10'>
              <div className=' w-full  col-span-9 rounded-lg'>
                <div className='space-y-6'>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className=' grid grid-cols-12 gap-1 space-x-4 border-2 shadow-sm rounded-lg  p-4 items-center'
                    >
                      <div className='col-span-2'>
                        <img
                          src={item.image}
                          alt=''
                          className='w-32 rounded-lg'
                        />
                      </div>
                      <div className='flex flex-col items-start col-span-4'>
                        <Link
                          to={`/singleproduct/${item._id}`}
                          className=' hover:underline'
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className='flex gap-2 items-center col-span-3'>
                        {/* Minus Button */}
                        <button
                          onClick={() => {}}
                          className=' border-2 shadow-sm px-4 py-1 rounded-md text-lg font-sans font-medium'
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        {/* Quantity Input */}
                        <input
                          type='number'
                          min='1'
                          max={item.countInStock}
                          value={item.qty}
                          onChange={() => {}}
                          className='bg-gray-100 p-2 rounded-md text-center outline-none w-16'
                        />
                        {/* Plus Button */}
                        <button
                          onClick={() => {}}
                          className=' border-2 shadow-sm px-4 py-1 rounded-md text-lg font-sans font-medium'
                          disabled={item.qty >= item.countInStock}
                        >
                          +
                        </button>
                      </div>

                      <div className='col-span-2 flex space-x-2 items-center'>
                        <p className='text-gray-600 font-bold'>
                          Rs {item.price}
                        </p>
                      </div>

                      <div className='col-span-1'>
                        <button>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-span-3 rounded-xl shadow-md  p-4 h-1/2'>
                <h1 className='text-xl text-gray-600'>
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h1>
                <p>{itemsPrice}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
