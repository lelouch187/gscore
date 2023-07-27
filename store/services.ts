import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductCardType, User } from './types';
import { HYDRATE } from 'next-redux-wrapper';

export const gscoreApi = createApi({
  reducerPath: 'gscoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://internship.purrweb.site/api/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getProductCard: builder.query<ProductCardType[], null>({
      query: () => 'products',
    }),
    getUser: builder.query<User, null>({
      query: () => 'users/me',
    }),
  }),
});

export const { useGetProductCardQuery, useGetUserQuery } = gscoreApi;