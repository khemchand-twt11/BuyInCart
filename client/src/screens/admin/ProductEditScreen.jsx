import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormComponent'
import { toast } from 'react-toastify'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slice/productApiSlice'

const ProductEditScreen = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  let [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(image)
    try {
      image = image.replace('/client', '')

      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap()
      toast.success('Product updated')
      refetch()
      navigate('/admin/productlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='w-11/12 mx-auto px-6'>
      <Link
        to='/admin/productlist'
        className='bg-gray-700 text-white px-4 py-2 rounded  hover:bg-gray-950'
      >
        Go Back
      </Link>
      <FormContainer>
        <div>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : (
            <div>
              <h1 className='text-2xl font-semibold text-gray-600 mb-6'>
                Edit Product
              </h1>
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <label htmlFor='name' className='block font-medium'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full border-2  rounded-md py-1 px-3 outline-none '
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='mb-3 flex gap-4'>
                  <div className='w-1/2'>
                    <label htmlFor='price' className='block font-medium'>
                      Price
                    </label>
                    <input
                      type='number'
                      id='price'
                      className='w-full border-2  rounded-md py-1 px-3 outline-none'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className='w-1/2'>
                    <label htmlFor='countInStock' className='block font-medium'>
                      Count In Stock
                    </label>
                    <input
                      type='number'
                      id='countInStock'
                      className='w-full border-2  rounded-md py-1 px-3 outline-none'
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor='image' className='block font-medium'>
                    Image
                  </label>
                  <input
                    type='text'
                    id='image'
                    className='w-full border-2 rounded-md py-1 px-3 outline-none'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <input
                    type='file'
                    id='image-file'
                    className='mt-2'
                    onChange={uploadFileHandler}
                  />
                  {loadingUpload && <Loader />}
                </div>

                <div className='mb-3'>
                  <label htmlFor='brand' className='block font-medium'>
                    Brand
                  </label>
                  <input
                    type='text'
                    id='brand'
                    className='w-full border-2 border-gray-300 rounded-md py-1 px-3 outline-none'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='category' className='block font-medium'>
                    Category
                  </label>
                  <input
                    type='text'
                    id='category'
                    className='w-full border-2  rounded-md py-1 px-3 outline-none'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='description' className='block font-medium'>
                    Description
                  </label>
                  <textarea
                    id='description'
                    rows='3'
                    className='w-full border-2 rounded-md py-1 px-3 outline-none'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='bg-gray-600 hover:bg-gray-950 text-white py-2 px-4 rounded-md mt-4'
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
