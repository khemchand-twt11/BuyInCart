import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
export default function HomeScreen() {
  const [products, setProduct] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProduct(data)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 mx-auto mt-10'>
        {products.map((item) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </>
  )
}
