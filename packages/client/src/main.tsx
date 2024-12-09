import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { startServiceWorker } from '../public/register-service-worker';

import App from './App';

import { store } from './redux/store/store';

import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //@ts-expect-error
  <Provider store={store}>
    <App />
  </Provider>,
);

startServiceWorker();
