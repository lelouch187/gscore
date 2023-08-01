import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ProductCardType,
  UserType,
  changeInfoType,
  changePasswordType,
  loginResultType,
  loginUserType,
  registrationResultType,
  registrationUserType,
} from './types';
import { HYDRATE } from 'next-redux-wrapper';

export const gscoreApi = createApi({
  reducerPath: 'gscoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://internship.purrweb.site/api/',
    prepareHeaders(headers, { getState }) {
      const state: any = getState();
      headers.set(
        'Authorization',
        state.persistedReducer.user.token
          ? `Bearer ${state.persistedReducer.user.token}`
          : 'Bearer ',
      );
      return headers;
    },
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
    login: builder.mutation<loginResultType, loginUserType>({
      query: (user) => ({
        url: 'users/sign-in',
        method: 'POST',
        body: user,
      }),
    }),
    changeInfo: builder.mutation<any, changeInfoType>({
      query: (info) => ({
        url: 'users',
        method: 'PATCH',
        body: info,
      }),
      // transformResponse: (response: {
      //   data: { email: string; username: string };
      // }) => {
      //   response.data.username;
      // },
    }),
    changePassword: builder.mutation<any, changePasswordType>({
      query: (passwords) => ({
        url: 'users/update-password',
        method: 'PATCH',
        body: passwords,
      }),
      // transformResponse: (response: {
      //   data: { email: string; username: string };
      // }) => {
      //   response.data.username;
      // },
    }),
  }),
});

export const {
  useGetProductCardQuery,
  useGetUserQuery,
  useRegistrationMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useChangeInfoMutation,
} = gscoreApi;
