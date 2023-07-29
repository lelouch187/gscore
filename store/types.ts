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

export type registrationUser = {
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

export type registrationResult = SuccessRegistrationType &
  ErrorRegistrationType;
