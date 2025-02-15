import './locales/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import MainLayout from './Components/MainLayout';
import { Provider, ErrorBoundary } from '@rollbar/react';
import useSocket from './hooks/useSocket';

const rollbarConfig = {
  accessToken: '5a390a00193b4eae8e44241b462b1136',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
        guess_uncaught_frames: true
      }
    }
  }
};

const App = () => {
  useSocket();

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
