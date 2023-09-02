import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { useGetProductsQuery } from '../slice/productApiSlice'
export default function HomeScreen() {
  const { data: products, isLoading, isError } = useGetProductsQuery()

  return (
    <div className='min-h-screen'>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>{isError?.data?.message || isError?.error}</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 mx-auto mt-10'>
          {products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  )
}
