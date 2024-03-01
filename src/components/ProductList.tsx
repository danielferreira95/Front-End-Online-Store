import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const handleAddToCard = (product: ProductType) => {
    const productsJson = localStorage.getItem('products') || '[]';
    const carrinhoDeCompras = JSON.parse(productsJson);
    const isDuplicated = carrinhoDeCompras
      .find((cart: ProductType) => cart.id === product.id);
    if (!isDuplicated) {
      localStorage.setItem('products', JSON
        .stringify([...carrinhoDeCompras,
          { price: product.price,
            quanty: 1,
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title }]));
    }
  };

  return (
    // Renderiza a lista de produtos
    <>
      { products.map((product: ProductType) => (
        <>
          <Link
            to="/ProductDetails"
            key={ product.id }
            data-testid="product-detail-link"
            state={ {
              product:
              {
                price: product.price,
                thumbnail: product.thumbnail,
                title: product.title } } }
          >
            <h2 data-testid="product">{ product.title }</h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{ product.price }</p>
          </Link>
          <button
            data-testid="product-add-to-cart"
            onClick={ () => handleAddToCard(product) }
          >
            Adicionar produto ao carrinho
          </button>
        </>
      ))}
    </>
  );
}

export default ProductList;
