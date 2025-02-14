import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Card } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import avatarSignup from '../assets/signup-avatar.jpg';
import { login } from '../slices/authSlice';

type FormInput = {
  username: string;
  password: string;
  confirmPassword: string;
};

type FormikProps = {
  setStatus: (status: string) => void;
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (values: FormInput, { setStatus }: FormikProps) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password
      });

      const { token, username } = response.data;

      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
      dispatch(login({ token, username }));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        setStatus(t('user_exists'));
      } else {
        setStatus(t('signup_error'));
      }
    }
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('required'))
      .min(3, t('username_length'))
      .max(20, t('username_length')),
    password: Yup.string().required(t('required')).min(6, t('password_length')),
    confirmPassword: Yup.string()
      .required(t('required'))
      .oneOf([Yup.ref('password')], t('match_password'))
  });

  return (
    <FormContainer>
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img className="rounded-circle" src={avatarSignup} alt={t('signup')} />
        </div>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={signupSchema}>
          {({ errors, touched, status }) => (
            <Form className="w-50">
              <h1 className="text-center mb-4">{t('signup')}</h1>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  placeholder={t('username_length')}
                  id="username"
                  required={true}
                  autoComplete="username"
                  className={`form-control ${(errors.username && touched.username) || status ? 'is-invalid' : ''}`}
                />
                <label className="form-label" htmlFor="username">
                  {t('username')}
                </label>
                {errors.username && touched.username && (
                  <div className="invalid-tooltip">{errors.username}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <Field
                  name="password"
                  placeholder={t('password_length')}
                  id="password"
                  type="password"
                  required={true}
                  autoComplete="password"
                  className={`form-control ${(errors.password && touched.password) || status ? 'is-invalid' : ''}`}
                />
                <label className="form-label" htmlFor="password">
                  {t('password')}
                </label>
                {errors.password && touched.password && (
                  <div className="invalid-tooltip">{errors.password}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <Field
                  name="confirmPassword"
                  placeholder={t('match_password')}
                  id="confirmPassword"
                  type="password"
                  required={true}
                  autoComplete="confirmPassword"
                  className={`form-control ${(errors.confirmPassword && touched.confirmPassword) || status ? 'is-invalid' : ''}`}
                />
                {status && <div className="invalid-tooltip">{status}</div>}
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="invalid-tooltip">{errors.confirmPassword}</div>
                )}
                <label className="form-label" htmlFor="confirmPassword">
                  {t('confirm_password')}
                </label>
              </div>
              <button type="submit" className="w-100 btn btn-outline-primary">
                {t('signup_button')}
              </button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </FormContainer>
  );
};

export default Signup;
