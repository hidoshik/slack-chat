import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { newMessage } from '../slices/messagesSlice';

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(newMessage(payload));
    });

    return () => {
      socket.off('newMessage', (payload) => {
        dispatch(newMessage(payload));
      });
    };
  }, [dispatch]);
};

export default useSocket;
