import { useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../modals/DeleteModal';
import RenameModal from '../modals/RenameModal';

interface ChannelParams {
  name: string;
  selectedChannel: string;
  onClick: () => void;
  id: string;
}

const RemovableChannel = (params: ChannelParams) => {
  const { name, selectedChannel, onClick, id } = params;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const { t } = useTranslation();

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button
          onClick={onClick}
          type="button"
          className={`w-100 rounded-0 text-start btn ${selectedChannel === name ? 'btn-secondary' : ''}`}>
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            className={selectedChannel === name ? 'btn-secondary' : ''}
            variant="basic"
            id="dropdown-basic">
            <span className="visually-hidden">{t('channel_control')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowDeleteModal(true)}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowRenameModal(true)}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {showDeleteModal &&
        createPortal(
          <DeleteModal
            id={id}
            show={showDeleteModal}
            onHide={(val: boolean) => setShowDeleteModal(val)}
          />,
          document.body
        )}
      {showRenameModal &&
        createPortal(
          <RenameModal
            id={id}
            show={showRenameModal}
            onHide={(val: boolean) => setShowRenameModal(val)}
            name={name}
          />,
          document.body
        )}
    </li>
  );
};

export default RemovableChannel;
