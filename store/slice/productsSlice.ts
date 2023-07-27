import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType } from '../types';
import { RootState } from '../index';

type InitialProductStateType = {
  selectedProduct: ProductCardType | null;
};

const initialState: InitialProductStateType = {
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct(state, { payload }: PayloadAction<ProductCardType>) {
      state.selectedProduct = payload;
    },
  },
});

export const { selectProduct } = productsSlice.actions;

export const selectGetProduct = (state: RootState) =>
  state.persistedReducer.products.selectedProduct;

export default productsSlice.reducer;
