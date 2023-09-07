import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
// import Paginate from '../../components/Paginate'
import { useParams } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {
  useGetProductsQuery,
  // useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slice/productApiSlice'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  })
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  // const [deleteProduct, { isLoading: loadingDelete }] =
  //   useDeleteProductMutation()

  const deleteHandler = async (id) => {
    // if (window.confirm('Are you sure')) {
    //   try {
    //     await deleteProduct(id)
    //     refetch()
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error)
    //   }
    // }
  }

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct()
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className='min-h-[80vh] w-11/12 mx-auto mt-10'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-semibold mb-6 text-gray-500'>Products</h1>
        <button
          className='ml-auto py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-950'
          onClick={createProductHandler}
        >
          Create Product
        </button>
      </div>
      {loadingCreate && <Loader />}
      {/* {loadingDelete && <Loader />} */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <table className='w-full mt-4  divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-2 px-4 text-gray-500  '>ID</th>
                <th className='py-2 px-4 text-gray-500  '>NAME</th>
                <th className='py-2 px-4 text-gray-500  '>PRICE</th>
                <th className='py-2 px-4  text-gray-500 '>CATEGORY</th>
                <th className='py-2 px-4 text-gray-500  '>BRAND</th>
                <th className='py-2 px-4  text-gray-500 '></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product._id} className='border-b'>
                  <td className='py-2 px-4  text-center'>{product._id}</td>
                  <td className='py-2 px-4  text-center'>{product.name}</td>
                  <td className='py-2 px-4  text-center'>
                    Rs. {product.price}
                  </td>
                  <td className='py-2 px-4  text-center'>{product.category}</td>
                  <td className='py-2 px-4  text-center'>{product.brand}</td>
                  <td className='py-2 px-4 border flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className='text-black underline mr-2'
                      >
                        <FaEdit />
                      </Link>
                    </div>

                    <button
                      className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </div>
  )
}

export default ProductListScreen
