import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
import { saveShippingAddress } from '../slice/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <FormComponent>
        <div>
          <h1 className='text-2xl font-semibold mb-10 text-center '>
            Shipping
          </h1>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
              />
            </div>

            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
              />
            </div>

            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
              />
            </div>

            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
                className='w-full px-4 py-2 border-2 rounded-md focus:outline-none '
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none'
            >
              Continue
            </button>
          </form>
        </div>
      </FormComponent>
    </div>
  )
}

export default ShippingScreen
