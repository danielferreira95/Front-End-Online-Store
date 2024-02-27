import React, { useEffect, useState } from 'react';
import mockItensCart from '../__mocks__/mockReq03';
import { Itens } from './cart/types';
import CardCart from '../components/CartCard';

function ScreenCart() {
  const [itensCart, setItensCart] = useState<Itens[]>([]);
  useEffect(() => {
    setItensCart(mockItensCart); // Vamos substitutir pelo Local Storage
  }, []);

  function removeItem(id: number) {
    const newData = itensCart.filter((el) => el.id !== Number(id));
    setItensCart(newData); // Vamos substitutir pelo Local Storage
  }

  function increaseItem(id: number) {
    const newIncrease = itensCart.map((el) => {
      if (el.id === Number(id)) {
        return { ...el, quanty: el.quanty + 1 };
      }
      return el;
    });
    setItensCart(newIncrease); // Vamos substitutir pelo Local Storage
  }

  function decreaseItem(id: number) {
    const newDecrease = itensCart.map((el) => {
      if (el.id === Number(id)) {
        if (el.quanty === 1) return el;
        return { ...el, quanty: el.quanty - 1 };
      }
      return el;
    });
    setItensCart(newDecrease); // Vamos substitutir pelo Local Storage
  }

  if (itensCart.length === 0) {
    return (
      <div>
        <h1>Carrinho de Compras</h1>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
  return (
    <div>
      {itensCart.map((itemCart, i) => {
        return (<CardCart
          removeItem={ () => removeItem(itemCart.id) }
          increaseItem={ () => increaseItem(itemCart.id) }
          decreaseItem={ () => decreaseItem(itemCart.id) }
          key={ i }
          itemCart={ itemCart }
        />);
      })}
    </div>
  );
}

export default ScreenCart;
