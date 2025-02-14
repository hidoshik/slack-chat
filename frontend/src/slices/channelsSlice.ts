import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

type ChannelSliceParams = {
  channels: Channel[];
  currentChannel: string;
};

type RenameChannelParams = {
  id: string;
  editedChannel: Channel;
};

const initialState: ChannelSliceParams = {
  channels: [],
  currentChannel: 'general'
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,

  reducers: {
    getChannels: (state, { payload }: PayloadAction<Channel[]>) => {
      state.channels = payload;
    },
    addChannel: (state, { payload }: PayloadAction<Channel>) => {
      state.channels = [...state.channels, payload];
    },
    setChannel: (state, { payload }: PayloadAction<string>) => {
      state.currentChannel = payload;
    },
    deleteChannel: (state, { payload }: PayloadAction<string>) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    renameChannel: (state, { payload }: PayloadAction<RenameChannelParams>) => {
      const { id, editedChannel } = payload;
      state.channels = state.channels.map((channel) => {
        return channel.id === id ? editedChannel : channel;
      });
    }
  }
});

export const channelsState = (state: RootState) => state.channels;

export const { getChannels, addChannel, setChannel, deleteChannel, renameChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
