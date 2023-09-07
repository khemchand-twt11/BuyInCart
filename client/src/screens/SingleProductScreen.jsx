import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import {
  useGetSingleProductQuery,
  useCreateReviewMutation,
} from '../slice/productApiSlice'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slice/cartSlice'
import { useState } from 'react'
import { BsCartFill, BsHeart } from 'react-icons/bs'
import { toast } from 'react-toastify'
import '../App.css'
import Message from '../components/Message'

export default function SingleProductScreen() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {
    data: product,
    refetch,
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

  const { userInfo } = useSelector((state) => state.auth)

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()
      refetch()
      toast.success('Review submitted successfully')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <div className='mb-20 mt-10'>
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
            <div className='grid grid-cols-12 gap-x-10 mt-6'>
              <div className='col-span-6'>
                <img src={product.image} alt='product image' />
              </div>
              <div className='col-span-6'>
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

                <p className='text-3xl font-bold text-gray-700 my-5'>
                  Rs. {product.price}
                </p>
                <p className='w-10/12 my-5 text-gray-700'>
                  {product.description}
                </p>
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

                <div className='flex justify-around items-center  gap-4 mt-5'>
                  <div className='flex gap-2 items-center w-1/'>
                    {/* Minus Button */}
                    <button
                      onClick={() => setQty(qty - 1)}
                      className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-1 rounded-md text-lg font-sans font-medium'
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
                      className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-1 rounded-md text-lg font-sans font-medium'
                      disabled={qty >= product.countInStock}
                    >
                      +
                    </button>
                  </div>

                  <div className='w-1/2'>
                    <button
                      className='w-full bg-gray-700 hover:bg-gray-950 flex justify-center gap-2 items-center text-white px-6 py-2  rounded-md font-sans'
                      disabled={
                        product.countInStock === 0 || qty > product.countInStock
                      }
                      onClick={cartHandler}
                    >
                      <BsCartFill />
                      <span> Add To Cart</span>
                    </button>
                  </div>
                </div>

                <div className='mt-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    Customer Reviews
                  </h2>
                  {product.reviews.length === 0 ? (
                    <Message variant='danger'>
                      <p>No Reviews</p>
                    </Message>
                  ) : (
                    <ul className='space-y-4'>
                      {product.reviews.map((review) => (
                        <li key={review._id}>
                          <div className='flex items-center mb-2'>
                            <strong className='mr-2'>{review.name}</strong>
                            <Rating value={review.rating} />
                          </div>
                          <p className='mb-2'>
                            {review.createdAt.substring(0, 10)}
                          </p>
                          <p className='mb-2'>{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {/* Review Submission Form */}
            <div className='w-2/5'>
              {userInfo ? (
                <div className='mt-8'>
                  <h2 className='text-2xl font-semibold mb-4'>
                    Write a Customer Review
                  </h2>
                  <form onSubmit={submitHandler} className='space-y-4'>
                    <div className='flex flex-col space-y-2'>
                      <label htmlFor='rating'>Rating</label>
                      <select
                        id='rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className='bg-gray-100 p-2 rounded-md outline-none'
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                    </div>
                    <div className='flex flex-col space-y-2'>
                      <label htmlFor='comment'>Comment</label>
                      <textarea
                        id='comment'
                        rows='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className='bg-gray-100 p-2 rounded-md outline-none'
                      ></textarea>
                    </div>
                    <button
                      type='submit'
                      disabled={loadingProductReview}
                      className='bg-gray-700 hover:bg-gray-950 text-white py-2 px-4 rounded-md'
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              ) : (
                <p className='mt-8'>
                  Please{' '}
                  <Link to='/login' className='text-blue-600 hover:underline'>
                    sign in
                  </Link>{' '}
                  to write a review
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
