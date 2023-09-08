import { Link } from 'react-router-dom'
import Rating from './Rating'

export default function ProductCard({ product }) {
  return (
    <div className='shadow-sm border-2 rounded-lg d px-2 pb-2 flex flex-col justify-around'>
      <Link to={`/singleproduct/${product._id}`} className='block mb-6'>
        <div className=' w-full rounded-xl'>
          <img
            src={product.image}
            alt={product.name}
            className='hover:scale-105'
          />
        </div>
      </Link>
      <Link
        className='block'
        style={{ marginLeft: 0 }}
        to={`/singleproduct/${product._id}`}
      >
        <div className='ml-0'>
          <p>{product.name}</p>

          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} ratings`}
            />
          </div>
          <p className='text-gray-600 text-lg font-medium mt-4'>
            Rs. {product.price}
          </p>
        </div>
      </Link>
    </div>
  )
}
