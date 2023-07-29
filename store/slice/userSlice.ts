import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardType, SuccessRegistrationType } from '../types';
import { RootState } from '../index';

interface InitialUserState extends SuccessRegistrationType {}

const initialState: InitialUserState = {
  email: '',
  username: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<SuccessRegistrationType>) {
      state = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectGetUser = (state: RootState) => state.persistedReducer.user;

export default userSlice.reducer;
