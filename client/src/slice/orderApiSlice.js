import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constant'

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApiSlice
