import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ProductCardType,
  UserType,
  loginUserType,
  registrationResultType,
  registrationUserType,
} from './types';
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
    getUser: builder.query<UserType, null>({
      query: () => 'users/me',
    }),
    registration: builder.mutation<
      registrationResultType,
      registrationUserType
    >({
      query: (user) => ({
        url: 'users/sign-up',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<registrationResultType, loginUserType>({
      query: (user) => ({
        url: 'users/sign-in',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetProductCardQuery,
  useGetUserQuery,
  useRegistrationMutation,
  useLoginMutation,
} = gscoreApi;
