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
