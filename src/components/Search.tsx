import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../types';

function Search() {
  const [query, setQuery] = useState('');
  const [productState, setProductState] = useState([]);

  async function handleSearch() {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    setProductState(data.results);
  }

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
        {productState.map((product: ProductType) => (
          <Link
            to="/ProductDetails"
            key={ product.id }
            data-testid="product-detail-link"
            state={ {
              product: { price: product.price,
                thumbnail: product.thumbnail,
                title: product.title } } }
          >
            <img src={ product.thumbnail } alt={ product.title } />
            <li data-testid="product">{ product.title }</li>
            <span>{ product.price }</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Search;
