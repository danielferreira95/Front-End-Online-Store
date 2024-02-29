import React, { useState } from 'react';
import { ProductType } from '../types';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  async function handleSearch() {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    setProducts(data.results);
  }

  const handleAddToCard = ( product: ProductType ) => {
    const products = localStorage.getItem("products") || "[]";
    const carrinhoDeCompras = JSON.parse( products );
    const isDuplicated = carrinhoDeCompras.find((cart: ProductType) => cart.id === product.id);
    if(!isDuplicated){
    localStorage.setItem("products", JSON
    .stringify([...carrinhoDeCompras, { price: product.price, quanty: product.installments?.quantity, id: product.id, thumbnail: product.thumbnail, title: product.title }]));
  } }
  
  return (
    <div>
      <input
        data-testid="query-input"
        type="text"
        value={ query }
        onChange={ (e) => setQuery(e.target.value) }
      />

      <button data-testid="query-button" onClick={ handleSearch }>
        Search
      </button>

      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <ul>
        {products.map((product: ProductType) => (
            <Link to={`/ProductDetails`}
             key={ product.id } data-testid="product-detail-link"
             state={{ product: { price: product.price, thumbnail: product.thumbnail, title: product.title }} } >
             <img src={ product.thumbnail } alt={ product.title } />
             <li data-testid="product">{ product.title }</li>
             <span>{ product.price }</span>
             <button data-testid="product-add-to-cart" onClick={ () => handleAddToCard(product) }>Adicionar produto ao carrinho</button>
           </Link>
        ))}
        </ul>
    </div>
  );
}

export default Search;
