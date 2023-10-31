import 'antd/dist/antd.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'src/assets/scss/_themes.scss';
import 'src/assets/scss/variable.scss';
import './App.scss';
import Layout from './components/01.layout';
import LocaleProviderComponent from './components/09.locale-provider';
import { AuthProvider } from './contexts/auth';
import ToastContext from './contexts/toast';
import Routes from './routes/Routes';
import initStore from './store';

const App: React.FC = () => {
  const { store } = initStore();

  return (
      <Provider store={store}>
        <LocaleProviderComponent>
          <BrowserRouter basename="">
            <AuthProvider>
              {/* <WrapperLayout /> */}
              <ToastContext />
              <Layout>
                <Routes />
              </Layout>
            </AuthProvider>
          </BrowserRouter>
        </LocaleProviderComponent>
      </Provider>
  );
};

export default App;
