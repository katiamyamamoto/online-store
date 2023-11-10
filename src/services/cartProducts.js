const PRODUCTS_TRYBE_KEY = 'products_trybe_key';

if (!JSON.parse(localStorage.getItem(PRODUCTS_TRYBE_KEY))) {
  localStorage.setItem(PRODUCTS_TRYBE_KEY, JSON.stringify([]));
}

export const readCart = () => JSON.parse(localStorage.getItem(PRODUCTS_TRYBE_KEY));

const saveCart = (products) => localStorage
  .setItem(PRODUCTS_TRYBE_KEY, JSON.stringify(products));

export const addProduct = (product) => {
  if (product && product.title && product.thumbnail) {
    const cart = readCart();
    const findProduct = cart.find((p) => p.id === product.id);
    if (findProduct) {
      const objIndex = cart.findIndex((p) => p.id === product.id);
      cart[objIndex].quantity += 1;
      saveCart(cart);
    } else {
      saveCart([...cart, product]);
    }
  }
};

export const decreaseProduct = (product) => {
  const cart = readCart();
  const productIndex = cart.findIndex((p) => p.id === product.id);
  cart[productIndex].quantity -= 1;
  saveCart(cart);
};

export const removeProduct = (product) => {
  const cart = readCart();
  const productIndex = cart.findIndex((p) => p.id === product.id);
  cart.splice(productIndex, 1);
  saveCart(cart);
};
