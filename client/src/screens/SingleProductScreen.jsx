import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Rating from '../components/Rating'
import { useEffect, useState } from 'react'

export default function SingleProductScreen() {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/singleproduct/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])
  return (
    <div className='w-10/12  mx-auto mt-10'>
      <Link to='/' className='bg-gray-200 px-3 py-2 rounded-sm'>
        Go Back
      </Link>

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
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
            </span>
            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
          </p>
          <button
            className='bg-gray-700 text-white px-4 py-2 mt-4 rounded-md text-lg font-sans font-medium'
            disabled={product.countInStock === 0}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}
