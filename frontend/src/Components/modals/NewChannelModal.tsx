import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannel } from '../../slices/channelsSlice';
import { setChannel } from '../../slices/channelsSlice';
import ModalForm from './ModalForm';

type ChannelModalParams = {
  show: boolean;
  onHide: (val: boolean) => void;
};

type FormInput = {
  name: string;
};

const NewChannelModal: React.FC<ChannelModalParams> = (params) => {
  const { show, onHide } = params;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const notifySuccess = () => toast.success(t('new_channel_success_toast'));
  const notifyError = () => toast.error(t('new_channel_error_toast'));

  const handleSubmit = async (values: FormInput) => {
    const newChannel = { name: values.name };
    const token = window.localStorage.getItem('token');

    try {
      const response = await axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notifySuccess();
      dispatch(addChannel(response.data));
      dispatch(setChannel(values.name));
      onHide(false);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={() => onHide(false)}>
        <Modal.Title id="contained-modal-title-vcenter">{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onSubmit={handleSubmit} onHide={onHide} name={''}></ModalForm>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
