import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ChannelsPanel from '../Components/chat/ChannelsPanel.jsx';
import CurrentChannel from '../Components/chat/CurrentChannel.jsx';
import { setChannels } from '../slices/channelsSlice.js';
import { Container, Row, Spinner } from 'react-bootstrap';

const MainPage = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    };

    axios
      .get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(setChannels(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const channels = useSelector((state) => state.channels.channels);

  if (channels.length === 0) {
    return (
      <div className="d-flex justify-content-center h-100 align-items-center">
        <Spinner
          animation="border"
          className="text-primary"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsPanel selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
        <CurrentChannel selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
      </Row>
    </Container>
  );
};

export default MainPage;
