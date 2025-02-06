import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './slices/store.js';

const init = async () => {
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
