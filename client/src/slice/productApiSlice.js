import { PRODUCTS_URL } from '../constant'
import { apiSlice } from './apiSlice'

export const producsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: PRODUCTS_URL + `/${productId}`,
      }),
      KeepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = producsApiSlice
