import React, { useState } from 'react';
import { ProductType } from '../types';

function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  async function handleSearch() {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    setProducts(data.results);
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
        {products.map((product: ProductType) => (
          <li key={ product.id } data-testid="product">
            <h2>{product.title}</h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
