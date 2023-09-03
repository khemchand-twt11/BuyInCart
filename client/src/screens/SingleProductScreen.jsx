import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetSingleProductQuery } from '../slice/productApiSlice'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slice/cartSlice'
import { useState } from 'react'
import { BsCartFill, BsHeart } from 'react-icons/bs'
import '../App.css'

export default function SingleProductScreen() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [qty, setQty] = useState(1)

  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductQuery(productId)

  const cartHandler = () => {
    const ifItemExists = cartItems.find((item) => item._id === product._id)
    if (ifItemExists) {
      alert('Product already in cart')
      console.log('Product already in cart')
    } else {
      dispatch(addToCart({ ...product, qty }))
      navigate('/cart')
    }
  }

  return (
    <>
      <Link to='/' className='bg-gray-200 px-3 py-2 rounded-sm ml-28'>
        Go Back
      </Link>
      <div className='min-h-screen relative'>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div>{isError?.data?.message || isError?.error}</div>
        ) : (
          <div className='w-10/12 mx-auto mt-10'>
            <div className='flex gap-10 mt-6'>
              <div>
                <img src={product.image} alt='product image' />
              </div>
              <div>
                <h1 className='text-4xl font-semibold'>{product.name}</h1>
                <div className='flex'>
                  <Rating
                    value={product.rating}
                    text={`based on ${product.numReviews} reviews`}
                  />
                  <button
                    className='w-1/2 text-black px-4 py-2 mt-4 rounded-md  font-sans flex justify-center items-center gap-2'
                    disabled={product.countInStock === 0}
                    onClick={cartHandler}
                  >
                    <BsHeart />
                    Add To Favourite
                  </button>
                </div>

                <p>Rs. {product.price}</p>
                <p className='w-10/12'>{product.description}</p>
                <p className='flex gap-2 items-center'>
                  <span className='relative flex h-3 w-3'>
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
                      }  opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
                      } `}
                    ></span>
                  </span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </p>
                {/* Quantity Input with Plus and Minus Buttons */}

                <div className='flex items-center w-10/12 gap-4 '>
                  <div className='flex gap-2 items-center w-1/2'>
                    {/* Minus Button */}
                    <button
                      onClick={() => setQty(qty - 1)}
                      className='bg-gray-200 text-gray-700 px-6 py-1 rounded-md text-lg font-sans font-medium'
                      disabled={qty <= 1}
                    >
                      -
                    </button>
                    {/* Quantity Input */}
                    <input
                      type='number'
                      min='1'
                      max={product.countInStock}
                      value={qty}
                      onChange={(e) => setQty(parseInt(e.target.value))}
                      className='bg-gray-100 p-2 rounded-md text-center outline-none'
                    />
                    {/* Plus Button */}
                    <button
                      onClick={() => setQty(qty + 1)}
                      className='bg-gray-200 text-gray-700 px-6 py-1 rounded-md text-lg font-sans font-medium'
                      disabled={qty >= product.countInStock}
                    >
                      +
                    </button>
                  </div>

                  <div className='w-1/2'>
                    <button
                      className='w-full bg-gray-700 flex justify-center gap-2 items-center text-white px-6 py-2  rounded-md font-sans'
                      disabled={
                        product.countInStock === 0 ||
                        qty >= product.countInStock
                      }
                      onClick={cartHandler}
                    >
                      <BsCartFill />
                      <span> Add To Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
