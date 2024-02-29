function CardCart({ itemCart: { title, price, quanty, thumbnail, key, id },
  removeItem, increaseItem, decreaseItem }: any) {
  return (
    <div key={ key }>
      <button
        onClick={ removeItem }
        type="button"
        value={ id }
        data-testid="remove-product"
      >
        Excluir
      </button>
      <img src={ thumbnail } alt={ `Imagem do ${title}` } />
      <p data-testid="shopping-cart-product-name" >{ title }</p>
      <button
        type="button"
        data-testid="product-increase-quantity"
        onClick={ increaseItem }
      >
        +
      </button>
      <p data-testid="shopping-cart-product-quantity">{ quanty }</p>
      <button
        type="button"
        data-testid="product-decrease-quantity"
        onClick={ decreaseItem }
      >
        -
      </button>
      <p>{ price }</p>
    </div>
  );
}

export default CardCart;
