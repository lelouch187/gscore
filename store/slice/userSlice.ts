import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUserType, successLoginType } from '../types';
import { RootState } from '../index';

interface InitialUserState extends successLoginType {}

const initialState: InitialUserState = {
  token: '',
  user: {
    id: 0,
    email: '',
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<successLoginType>) {
      return payload;
    },
    logoutUser(state) {
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const selectGetUser = (state: RootState) => state.persistedReducer.user;

export default userSlice.reducer;
