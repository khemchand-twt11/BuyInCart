import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const ifItemExist = state.cartItems.find((x) => x._id === item._id)

      if (ifItemExist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions
export default cartSlice.reducer
