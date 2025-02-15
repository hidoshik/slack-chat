import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../slices/channelsSlice';

interface DeleteModalParams {
  show: boolean;
  onHide: (val: boolean) => void;
  id: string;
}

const DeleteModal = (params: DeleteModalParams) => {
  const { show, onHide, id } = params;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const notifySuccess = () => toast.success(t('delete_success_toast'));
  const notifyError = () => toast.error(t('delete_error_toast'));

  const handleDelete = async () => {
    const token = window.localStorage.getItem('token');

    const url = `/api/v1/channels/${id}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notifySuccess();
      onHide(false);
      dispatch(deleteChannel(id));
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={() => onHide(false)}>
        <Modal.Title id="contained-modal-title-vcenter">{t('delete_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('confirm')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={() => onHide(false)} className="me-2 btn btn-secondary">
            {t('cancel')}
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">
            {t('delete')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
