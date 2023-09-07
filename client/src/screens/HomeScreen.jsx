import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { useGetProductsQuery } from '../slice/productApiSlice'
export default function HomeScreen() {
  const { keyword } = useParams()
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({ keyword })
  console.log(products)
  return (
    <div className='min-h-screen'>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>{isError?.data?.message || isError?.error}</div>
      ) : (
        <div
          className={
            products.length !== 0 &&
            'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-11/12 mx-auto mt-10'
          }
        >
          {products.length !== 0 ? (
            products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))
          ) : (
            <h1 className='text-center text-4xl font-bold text-gray-600 mt-32'>
              Product Not Found...
            </h1>
          )}
        </div>
      )}
    </div>
  )
}
