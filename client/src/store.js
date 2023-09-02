import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slice/apiSlice'
import cartSliceReducer from './slice/cartSlice'
//Configuring store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
