import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import { login } from '../slices/authSlice';
import avatarLogin from '../assets/login-avatar.jpg';
import FormContainer from '../Components/FormContainer';

interface FormInput {
  username: string;
  password: string;
}

const Login = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const handleSubmit = async (values: FormInput) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token, username } = response.data;

      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
      dispatch(login({ token, username }));
      navigate('/');
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      inputEl.current?.select();
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <Card.Body className="row p-5">
        <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
          <img className="rounded-circle" src={avatarLogin} alt="Войти" />
        </Col>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">{t('login')}</h1>
            <div className="form-floating mb-3">
              <Field
                type="text"
                name="username"
                required={true}
                autoComplete="username"
                id="username"
                placeholder={t('your_nickname')}
                className={`form-control ${isValid === false ? 'is-invalid' : ''}`}
                innerRef={inputEl}
              />
              <label htmlFor="username">{t('your_nickname')}</label>
            </div>
            <div className="form-floating mb-4">
              <Field
                type="password"
                name="password"
                required={true}
                autoComplete="current-password"
                id="password"
                placeholder={t('password')}
                className={`form-control ${isValid === false ? 'is-invalid' : ''}`}
              />
              {isValid === false ? (
                <div className="invalid-tooltip">{t('invalid_login')}</div>
              ) : null}
              <label htmlFor="password" className="form-label">
                {t('password')}
              </label>
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              {t('submit')}
            </button>
          </Form>
        </Formik>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('no_account')} </span>
          <a href="/signup">{t('signup')}</a>
        </div>
      </Card.Footer>
    </FormContainer>
  );
};

export default Login;
