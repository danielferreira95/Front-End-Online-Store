import React, { useEffect, useState } from 'react';
import { ProductType, ProductListProps } from '../types';
import { getProductsFromCategoryAndQuery } from '../services/api';

function ProductList({ categoryId }: ProductListProps) {
  const [products, setProducts] = useState<ProductType[]>([]); // Estado para os produtos
  const [error, setError] = useState<string | null>(null); // Estado pros erros na busca
  const [loading, setLoading] = useState(true); // Estado carregando os dados

  useEffect(() => {
    async function fetchProducts() { // chama a api
      try {
        const data:
        { results:
        ProductType[] } = await getProductsFromCategoryAndQuery(categoryId, '');
        setProducts(data.results);
        setLoading(false);
      } catch (fetchError) {
        setError('Erro ao buscar produtos.');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // Renderiza a lista de produtos
    <ul>
      {products.map((product) => (
        <li
          key={ product.id }
          data-testid="product"
        >
          <h2>{product.title}</h2>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{product.price}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
