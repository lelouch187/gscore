import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../types';
import { RootState } from '../index';

type InitialProductStateType = {
  selectedProduct: ProductCardType | null;
  productId: number | null;
  subscribeId: number | null;
};

const initialState: InitialProductStateType = {
  selectedProduct: null,
  productId: null,
  subscribeId: null,
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct(state, { payload }: PayloadAction<ProductCardType>) {
      state.selectedProduct = payload;
    },
    upgradeProduct(
      state,
      { payload }: PayloadAction<{ productId: number; subscribeId: number }>,
    ) {
      state.productId = payload.productId;
      state.subscribeId = payload.subscribeId;
    },
    resetUpgrade(state) {
      state.productId = null;
      state.subscribeId = null;
    },
  },
});

export const { selectProduct, upgradeProduct, resetUpgrade } =
  productsSlice.actions;

export const selectGetProduct = (state: RootState) =>
  state.persistedReducer.products.selectedProduct;

export const selectProductInfo = (state: RootState) =>
  state.persistedReducer.products;

export default productsSlice.reducer;
