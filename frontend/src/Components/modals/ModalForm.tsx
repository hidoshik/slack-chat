import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsState } from '../../slices/channelsSlice';
import { useEffect, useRef } from 'react';

type FormInput = {
  name: string;
};

type ModalFormParams = {
  onSubmit: (values: FormInput) => void;
  onHide: (val: boolean) => void;
  name: string;
};

const ModalForm = (params: ModalFormParams) => {
  const { onSubmit, onHide, name } = params;

  const { t } = useTranslation();
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.select();
  }, []);

  const { channels } = useSelector(channelsState);
  const channelsNameList = channels.map((channel) => channel.name);

  const newChannelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('required'))
      .notOneOf(channelsNameList, t('must_be_unique'))
      .min(3, t('channel_name_length'))
      .max(20, t('channel_name_length'))
  });

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={onSubmit}
      validationSchema={newChannelSchema}
      validateOnBlur={false}
      validateOnChange={false}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              innerRef={inputEl}
              name="name"
              id="name"
              className={`mb-2 form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}></Field>
            <label htmlFor="name" className="visually-hidden">
              {t('channel_name')}
            </label>
            <div className="invalid-feedback">{errors.name && touched.name && errors.name}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={() => onHide(false)}>
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('send')}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModalForm;
