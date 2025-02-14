import { channelsState } from '../../slices/channelsSlice';
import { Col } from 'react-bootstrap';
import AddChannel from './AddChannel';
import Channel from './Channel';
import RemovableChannel from './RemovableChannel';
import { useSelector } from 'react-redux';

interface PanelControl {
  selectedChannel: string;
  changeChannel: (val: string) => void;
}

const ChannelsPanel = (params: PanelControl) => {
  const { selectedChannel, changeChannel } = params;

  const { channels } = useSelector(channelsState);

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
            <RemovableChannel
              key={id}
              id={id}
              name={name}
              selectedChannel={selectedChannel}
              onClick={() => changeChannel(name)}
            />
          ) : (
            <Channel
              key={id}
              name={name}
              selectedChannel={selectedChannel}
              onClick={() => changeChannel(name)}
            />
          );
        })}
      </ul>
    </Col>
  );
};

export default ChannelsPanel;
