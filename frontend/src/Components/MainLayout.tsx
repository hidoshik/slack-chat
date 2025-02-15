import Navigator from './Navigator';
import { ToastContainer } from 'react-toastify';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="d-flex flex-column main-layout-height">
        <Navigator />
        {children}
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
