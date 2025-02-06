/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,

  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    newMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
});

export const { setMessages, newMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
