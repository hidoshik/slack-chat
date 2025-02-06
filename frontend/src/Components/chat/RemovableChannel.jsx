const RemovableChannel = ({ name }) => {
  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={`w-100 rounded-0 text-start btn ${selectedChannel === name ? 'btn-secondary' : ''}`}>
          <span className="me-1">#</span>
          {name}
        </button>
        <button type="button" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
            <span className="visually-hidden">Управление каналом</span>
        </button>
      </div>
    </li>
  );
};

export default RemovableChannel;
