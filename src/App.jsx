import { Header } from './components/Header/index.js';
import { Navigation } from './components/Navigation/index.js';
import { Catalog } from './components/Catalog/index.js';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { ModalDelivery } from './components/Modal/ModalDelivery.jsx';
import { ModalProductCard } from './components/ModalProductCard/ModalProductCard.jsx';

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      <footer></footer>
      <ModalDelivery />
      <ModalProductCard />
    </Provider>
  );
};
