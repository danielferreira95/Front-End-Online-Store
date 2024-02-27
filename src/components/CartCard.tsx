function CardCart({ itemCart: { name, price, quanty, img, key, id },
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
      <img src={ img } alt={ `Imagem do ${name}` } />
      <p>{ name }</p>
      <button
        type="button"
        data-testid="product-increase-quantity"
        onClick={ increaseItem }
      >
        +
      </button>
      <p>{ quanty }</p>
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
