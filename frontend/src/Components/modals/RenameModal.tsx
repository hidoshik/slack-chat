import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { renameChannel } from '../../slices/channelsSlice';
import ModalForm from './ModalForm';

interface RenameModalParams {
  show: boolean;
  onHide: (val: boolean) => void;
  id: string;
  name: string;
}

type FormInput = {
  name: string;
};

const RenameModal = (params: RenameModalParams) => {
  const { show, onHide, id, name } = params;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notifySuccess = () => toast.success(t('rename_success_toast'));
  const notifyError = () => toast.error(t('rename_error_toast'));

  const handleSubmit = async (values: FormInput) => {
    const token = window.localStorage.getItem('token');

    try {
      const editedName = { name: filter.clean(values.name) };
      const url = `/api/v1/channels/${id}`;
      const response = await axios.patch(url, editedName, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notifySuccess();

      const editedChannel = response.data;

      dispatch(renameChannel({ id, editedChannel }));
      onHide(false);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={() => onHide(false)}>
        <Modal.Title id="contained-modal-title-vcenter">{t('rename_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onSubmit={handleSubmit} onHide={onHide} name={name} />
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
