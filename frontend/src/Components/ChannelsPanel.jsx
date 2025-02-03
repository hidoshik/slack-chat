import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import AddChannel from './AddChannel.jsx';
import Channel from './Channel.jsx';
import RemovableChannel from './RemovableChannel.jsx';
import { setChannels } from '../slices/channelsSlice.js';

const ChannelsPanel = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(setChannels(response.data));
      });
  }, []);

  const channels = useSelector((state) => state.channels.channels);

  return (
    <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <AddChannel />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => {
          return removable ? (
            <RemovableChannel name={name} key={id}/>
          ) : (
            <Channel name={name} key={id} />
          );
        })}
      </ul>
    </Col>
  );
};

export default ChannelsPanel;
