import { Link, useLocation } from "react-router-dom";

function ProductDetails() {    
    const { state } = useLocation();
  
    return (
        <>
        <div>      
          <h2 data-testid="product-detail-name">{ state.product.title }</h2>
          <img src={ state.product.thumbnail  } alt={ state.product.title } data-testid="product-detail-image" />
          <p data-testid="product-detail-price">{ state.product.price  }</p>
         <Link to={"/cart"}>
          <button data-testid="shopping-cart-button">Carrinho de Compras</button>
         </Link>          
        </div>
      </>
    )
}

export default ProductDetails;