import { Link, useLocation } from "react-router-dom";
import { ProductType } from "../types";

function ProductDetails() {    
    const { state } = useLocation();

    const handleAddToCard = ( product: any ) => {
      const products = localStorage.getItem("products") || "[]";
      const carrinhoDeCompras = JSON.parse( products );
      const isDuplicated = carrinhoDeCompras.find((cart: ProductType) => cart.id === product.id);
      if(!isDuplicated){
      localStorage.setItem("products", JSON
      .stringify([...carrinhoDeCompras, { price: product.price, quanty: 1, id: product.id, thumbnail: product.thumbnail, title: product.title }]));
    } }
  
    return (
        <>
        <div>      
          <h2 data-testid="product-detail-name">{ state.product.title }</h2>
          <img src={ state.product.thumbnail  } alt={ state.product.title } data-testid="product-detail-image" />
          <p data-testid="product-detail-price">{ state.product.price  }</p>
          <button data-testid="product-add-to-cart" onClick={ () => handleAddToCard({ price: state.product.price, thumbnail: state.product.thumbnail, title: state.product.title }) }>Adicionar produto ao carrinho</button>
         <Link to={"/cart"}>
          <button data-testid="shopping-cart-button">Carrinho de Compras</button>
         </Link>          
        </div>
      </>
    )
}

export default ProductDetails;