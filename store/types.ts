import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type PricesType = {
  id: number;
  isActive: boolean;
  productId: number;
  price: string;
};

export type ProductCardType = {
  id: number;
  sitesCount: number;
  name: string;
  prices: PricesType[];
};

export type UserType = {
  id: number;
  email: string;
  username: string;
};
export type loginUserType = {
  email: string;
  password: string;
};
export type successLoginType = {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
};

export type registrationUserType = {
  email: string;
  username: string;
  password: string;
};

export type SuccessRegistrationType = {
  email: string;
  username: string;
  token: string;
};

export type ErrorDataType = {
  statusCode: number;
  message: string;
  error: string;
};
export type ErrorRegistrationType = {
  statusCode: number;
  data: ErrorDataType;
};

export type registrationResultType = SuccessRegistrationType &
  ErrorRegistrationType;

export type loginResultType = successLoginType & ErrorRegistrationType;

export type changeInfoType = {
  email: string;
  username: string;
};

export type changePasswordType = {
  currentPassword: string;
  newPassword: string;
};
export type subscribeIdType = {
  subscribe: {
    id: number;
    userId: number;
    currentPeriodStart: number;
    currentPeriodEnd: number;
  };
};
