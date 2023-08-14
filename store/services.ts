import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CodeType,
  ProductCardType,
  UserType,
  changeInfoType,
  changePasswordType,
  loginResultType,
  loginUserType,
  registrationResultType,
  registrationUserType,
  subscribeIdType,
  subscriptionsType,
} from './types';
import { HYDRATE } from 'next-redux-wrapper';

export const gscoreApi = createApi({
  reducerPath: 'gscoreApi',
  tagTypes: ['PRODUCT'],
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
    }),
    changePassword: builder.mutation<any, changePasswordType>({
      query: (passwords) => ({
        url: 'users/update-password',
        method: 'PATCH',
        body: passwords,
      }),
    }),
    bySubscribe: builder.mutation<subscribeIdType, number>({
      query: (priceId) => ({
        url: 'payments/buy',
        method: 'POST',
        body: { priceId },
      }),
    }),
    upgradeSubscribe: builder.mutation<
      subscribeIdType,
      { productId: number | null; subscribeId: number | null }
    >({
      query: (payload) => ({
        url: 'subscribe/change-product',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PRODUCT'],
    }),
    getSubscriptions: builder.query<subscriptionsType, null>({
      query: () => 'subscribe/self',
      providesTags: (result) => ['PRODUCT'],
    }),
    activateCode: builder.mutation<CodeType, { code: string }>({
      query: (payload) => ({
        url: 'code/activate',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PRODUCT'],
    }),
    manageCode: builder.mutation<
      CodeType,
      { codesIds: number[]; subscribeId: number }
    >({
      query: (payload) => ({
        url: 'code/manage',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['PRODUCT'],
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
  useBySubscribeMutation,
  useGetSubscriptionsQuery,
  useUpgradeSubscribeMutation,
  useActivateCodeMutation,
  useManageCodeMutation,
} = gscoreApi;
