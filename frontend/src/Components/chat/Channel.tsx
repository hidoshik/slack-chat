interface ChannelParams {
  name: string;
  selectedChannel: string;
  onClick: () => void;
}

const Channel = (params: ChannelParams) => {
  const { name, selectedChannel, onClick } = params;
  return (
    <li className="nav-item w-100">
      <button
        onClick={onClick}
        type="button"
        className={`w-100 rounded-0 text-start btn ${selectedChannel === name ? 'btn-secondary' : ''}`}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
