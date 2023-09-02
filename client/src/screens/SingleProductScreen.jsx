import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetSingleProductQuery } from '../slice/productApiSlice'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slice/cartSlice'
export default function SingleProductScreen() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  console.log(cartItems)
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
      dispatch(addToCart({ ...product, qty: 1 }))
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
          <div className='w-10/12  mx-auto mt-10'>
            <div className='flex gap-10 mt-6 '>
              <div>
                <img src={product.image} alt='product image' />
              </div>
              <div>
                <h1 className='text-4xl'>{product.name}</h1>
                <Rating
                  value={product.rating}
                  text={`based on ${product.numReviews} reviews`}
                />
                <p>Rs. {product.price}</p>
                <p className='w-10/12'>{product.description}</p>
                <p className='flex gap-2 items-center '>
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
                <button
                  className='bg-gray-700 text-white px-4 py-2 mt-4 rounded-md text-lg font-sans font-medium'
                  disabled={product.countInStock === 0}
                  onClick={cartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
