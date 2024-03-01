const BASE_URL = 'https://api.mercadolibre.com';

// * retorna as categorias dos produtos.
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/sites/MLB/categories`);
  const categories = await response.json();
  return categories;
}

// * * faz busca pelo termo de busca (param query) e pelo id da categoria.
export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const response = await
  fetch(`${BASE_URL}/sites/MLB/search?category=${categoryId}&q=${query}`);
  const productsFromCategoryAndQuery = await response.json();
  return productsFromCategoryAndQuery;
}

// Esta implementação específica não é avaliada, mas pode ajudar você 🙂
// Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
// * Retorna um produto com base no seu id.
export async function getProductById(id: string) {
  const response = await fetch(`${BASE_URL}/items?ids=${id},`);
  const productById = await response.json();
  return productById;
}

export async function getDetails(id:string) {
  const response = await fetch(`${BASE_URL}/items/${id}`);
  const detailsById = await response.json();
  return detailsById;
}
// getProductById('MLB4457830512').then((product) => console.log(product));
