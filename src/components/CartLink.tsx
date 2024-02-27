import React from 'react';
import { Link } from 'react-router-dom';
// import ScreenCart from './ScreenCart';

function cart() {
  return (
    <div>
      <Link to="/cart" data-testid="shopping-cart-button">
        Ir para o carrinho
      </Link>
    </div>
  );
}
export default cart;
