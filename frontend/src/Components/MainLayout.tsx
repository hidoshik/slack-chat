import Navigator from './Navigator';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column main-layout-height">
      <Navigator />
      {children}
    </div>
  );
};

export default MainLayout;
