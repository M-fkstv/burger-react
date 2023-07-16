import { Header } from './components/Header/index.js';
import { Navigation } from './components/Navigation/index.js';
import { Catalog } from './components/Catalog/index.js';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { ModalDelivery } from './components/ModalDelivery/ModalDelivery.jsx';

export const App = () => {
  return (
    <Provider store={store}>
      <Header/>
      <main>
        <Navigation/>
        <Catalog/>
      </main>
      <footer></footer>
      <ModalDelivery/>
    </Provider>
  );
};


