import React, { useEffect, useState } from 'react';
import { CategoryType } from '../types';
import ProductList from './ProductList';
import { getCategories } from '../services/api';

function ProductCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]); // Armazena lista de categorias
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Armazena categoria selecionada
  const [error, setError] = useState<string | null>(null); // Lida com erros
  const [loading, setLoading] = useState(true); // Mostra carregamento

  useEffect(() => {
    async function fetchCategories() { // Chama a api
      try {
        const data: CategoryType[] = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (fetchError) {
        setError('Erro ao buscar categorias.');
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return ( // Renderiza a lista de categorias
    <div>
      <ul>
        {categories.map((category) => (
          <button
            key={ category.id }
            data-testid="category"
            onClick={ () => handleCategoryClick(category.id) }
          >
            {category.name}
          </button>
        ))}
      </ul>
      {/* Renderiza o componente ProductList se uma categoria estiver selecionada */}
      {selectedCategory && <ProductList categoryId={ selectedCategory } />}
    </div>
  );
}

export default ProductCategories;
