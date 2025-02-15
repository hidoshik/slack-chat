import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { newMessage } from '../slices/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from '../slices/channelsSlice';

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

interface Message {
  body: string;
  channelId: string;
  id: string;
  removable: boolean;
  username: string;
}

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (payload: Message) => dispatch(newMessage(payload));
    const handleNewChannel = (payload: Channel) => dispatch(addChannel(payload));
    const handleRemoveChannel = (payload: { id: string }) => dispatch(deleteChannel(payload));
    const handleRenameChannel = (payload: Channel) => {
      const { id } = payload;
      dispatch(renameChannel({ id, editedChannel: payload }));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [dispatch]);
};

export default useSocket;
