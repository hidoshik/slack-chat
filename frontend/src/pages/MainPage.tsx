import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ChannelsPanel from '../Components/chat/ChannelsPanel';
import CurrentChannel from '../Components/chat/CurrentChannel';
import { getChannels } from '../slices/channelsSlice';
import { Container, Row, Spinner } from 'react-bootstrap';
import { channelsState, setChannel } from '../slices/channelsSlice';

const MainPage = () => {
  const { channels, currentChannel } = useSelector(channelsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    axios
      .get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(getChannels(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, navigate, token]);

  if (channels.length === 0) {
    return (
      <div className="d-flex justify-content-center h-100 align-items-center">
        <Spinner animation="border" className="text-primary" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsPanel
          selectedChannel={currentChannel}
          changeChannel={(val: string) => dispatch(setChannel(val))}
        />
        <CurrentChannel selectedChannel={currentChannel} />
      </Row>
    </Container>
  );
};

export default MainPage;
