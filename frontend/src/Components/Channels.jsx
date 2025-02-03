import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import AddChannel from './AddChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  axios
    .get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
    });

  return (
    <Col md="2" className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <AddChannel />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        Каналы
      </ul>
    </Col>
  );
};

export default Channels;
