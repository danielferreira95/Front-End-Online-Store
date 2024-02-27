function CardCart({ itemCart: { name, price, quanty, img, key } }: any) {
  console.log(name);
  return (
    <div key={ key }>
      <button>Excluir</button>
      <img src={ img } alt={ `Imagem do ${name}` } />
      <p>{ name }</p>
      <button>-</button>
      <p>{ quanty }</p>
      <button>+</button>
      <p>{ price }</p>
    </div>
  );
}

export default CardCart;
