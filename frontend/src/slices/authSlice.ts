import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
  token: string;
  username: string;
}

const initialState: AuthState = {
  token: '',
  username: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, { payload }: PayloadAction<AuthState>) => {
      const { token, username } = payload;
      state.token = token;
      state.username = username;
    }
  }
});

export const token = (state: RootState) => state.auth.token;
export const username = (state: RootState) => state.auth.username;

export const { login } = authSlice.actions;
export default authSlice.reducer;
