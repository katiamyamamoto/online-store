export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductById(productId) {
  const request = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductBySearch(QUERY) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductByCategory(CATEGORY_ID) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`);
  const requestJson = await request.json();
  return requestJson;
}
