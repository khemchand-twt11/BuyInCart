import { PRODUCTS_URL } from '../constant'
import { apiSlice } from './apiSlice'

export const producsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
    }),

    KeepUnusedDataFor: 5,
  }),
})

export const { useGetProductsQuery } = producsApiSlice
