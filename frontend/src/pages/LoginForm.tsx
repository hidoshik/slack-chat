import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { login, setUsername } from '../slices/authSlice';
import avatarLogin from '../assets/avatar.jpg';

const LoginForm = () => {
  const [isValid, setIsValid] = useState(null);
  const inputEl = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token, username } = response.data;

      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
      dispatch(login(token));
      navigate('/');
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      inputEl.current.select();
      console.log(error);
    }
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md="8" className="col-12 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={avatarLogin} alt="Войти" />
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}>
                <Form className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field
                      type="text"
                      name="username"
                      required={true}
                      autoComplete="username"
                      id="username"
                      placeholder="Ваш ник"
                      className={`form-control ${isValid === false ? 'is-invalid' : ''}`}
                      innerRef={inputEl}
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-4">
                    <Field
                      type="password"
                      name="password"
                      required={true}
                      autoComplete="current-password"
                      id="password"
                      placeholder="Пароль"
                      className={`form-control ${isValid === false ? 'is-invalid' : ''}`}
                    />
                    {isValid === false ? (
                      <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                    ) : null}
                    <label htmlFor="password" className="form-label">
                      Пароль
                    </label>
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                    Submit
                  </button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
