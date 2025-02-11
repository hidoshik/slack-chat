import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Message {
  body: string;
  channelId: string;
  id: string;
  removable: boolean;
  username: string;
}

const initialState: { messages: Message[] } = {
  messages: []
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,

  reducers: {
    setMessages: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload;
    },
    newMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages = [...state.messages, payload];
    }
  }
});

export const { setMessages, newMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
