import Navigator from './Navigator';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column main-layout-height">
      <Navigator />
      {children}
    </div>
  );
};

export default MainLayout;
