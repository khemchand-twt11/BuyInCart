import { Link } from 'react-router-dom'
import Rating from './Rating'
export default function ProductCard({ product }) {
  return (
    <div className='shadow-md px-2 w-64 pb-2'>
      <div>
        <img src={product.image} alt='products' />
      </div>
      <div>
        <Link to={`/product/${product._id}`} className='text-sm'>
          {product.name}
        </Link>
        <div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} ratings`}
          />
        </div>
        <p className='text-gray-600 text-lg'>Rs. {product.price}</p>
      </div>
    </div>
  )
}
