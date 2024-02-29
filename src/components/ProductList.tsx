import React, { useEffect, useState } from 'react';
import { ProductType, ProductListProps } from '../types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductDetails from '../pages/ProductDetails';
import { Link } from 'react-router-dom';

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
    <>
      {products.map((product: ProductType) => (
        <Link to={`/ProductDetails/${product.id}`}
          key={ product.id }
          data-testid="product product-detail-link"
        >
          <h2>{product.title}</h2>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{product.price}</p>
        </Link>
      ))}
      </>
  );
}

export default ProductList;
