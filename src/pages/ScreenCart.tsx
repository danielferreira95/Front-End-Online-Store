import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Itens } from './cart/types';
import CardCart from '../components/CartCard';

function saveProductLocalStorage(key: string, products: Itens[] = []) {
  const parseLocalStorage = JSON.stringify(products);
  localStorage.setItem(key, parseLocalStorage);
}

function ScreenCart() {
  const [itensCart, setItensCart] = useState<Itens[]>([]);
  useEffect(() => {
    const data = localStorage.getItem('products');
    const notNull = data || '[]';
    const parseLocalStorage = JSON.parse(notNull);
    setItensCart(parseLocalStorage);
  }, []);

  function removeItem(id: string) {
    const newData = itensCart.filter((el) => el.id !== id);
    saveProductLocalStorage('products', newData);
    setItensCart(newData);
  }

  function increaseItem(id: string) {
    const newIncrease = itensCart.map((el) => {
      if (el.id === id) {
        return { ...el, quanty: el.quanty + 1 };
      }
      return el;
    });
    saveProductLocalStorage('products', newIncrease);
    setItensCart(newIncrease);
  }

  function decreaseItem(id: string) {
    const newDecrease = itensCart.map((el) => {
      if (el.id === id) {
        if (el.quanty === 1) return el;
        return { ...el, quanty: el.quanty - 1 };
      }
      return el;
    });
    saveProductLocalStorage('products', newDecrease);
    setItensCart(newDecrease);
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
    <>
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
      <div>
        <button>
          <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
        </button>
      </div>
    </>
  );
}

export default ScreenCart;
