import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface InitialUserState {
  token: string;
  username: string;
}

const initialState: InitialUserState = {
  token: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<InitialUserState>) {
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
