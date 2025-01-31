import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, { payload }) => {
            state.token = payload;
        },
    }
})

export const { login } = authSlice.actions;
export default authSlice.reducer;