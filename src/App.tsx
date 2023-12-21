import React, { Fragment, useState } from 'react';
import Header from './components/UI/Header';
import AviablePizzas from './components/Pizzas/AviablePizzas';
import NewPizza from './components/Pizzas/NewPizza';
import Modal from './components/UI/Modal';
import Cart from './components/Cart/Cart';
import { queryClient } from './utils/https';
import { QueryClientProvider } from '@tanstack/react-query';

const App:React.FC = () => {

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModalHandler = (): void => {
    setModalIsOpen(false);
  }

  const openModalHandler = (): void => {
    setModalIsOpen(true);
  }

  return (
    <QueryClientProvider client={queryClient}>
    <Fragment>
      <Header onOpenModal={openModalHandler} />
      <main>
          {modalIsOpen && <Modal onClose={closeModalHandler}>
          <Cart onClose={closeModalHandler}/>
          </Modal>}
          <NewPizza/>
          <AviablePizzas />
      </main>
    </Fragment>
    </QueryClientProvider>
  );
}

export default App;
