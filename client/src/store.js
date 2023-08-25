import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slice/apiSlice'

//Configuring store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
