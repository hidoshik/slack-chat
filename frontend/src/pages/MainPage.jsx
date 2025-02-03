import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ChannelsPanel from '../Components/ChannelsPanel.jsx';
import CurrentChannel from '../Components/CurrentChannel.jsx';

const MainPage = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsPanel />
        <CurrentChannel />
      </Row>
    </Container>
  );
};

export default MainPage;
