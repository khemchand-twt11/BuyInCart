import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormComponent'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slice/cartSlice'

const PaymentScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <div>
          <h1 className='text-2xl font-semibold text-center mb-10'>
            Payment Method
          </h1>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Select Method
              </label>
              <div className='mt-2'>
                <label className='inline-flex items-center text-sm text-gray-700'>
                  <input
                    type='radio'
                    className='form-radio h-4 w-4 text-indigo-600'
                    name='paymentMethod'
                    value='PayPal'
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className='ml-2'>PayPal or Credit Card</span>
                </label>
              </div>
            </div>

            <button
              type='submit'
              className='bg-gray-700 text-white rounded-md px-4 py-2 hover:bg-gray-800 focus:outline-none'
            >
              Continue
            </button>
          </form>
        </div>
      </FormContainer>
    </div>
  )
}

export default PaymentScreen
