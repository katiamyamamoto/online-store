import React, { Component } from 'react';
import { readCart, addProduct,
  decreaseProduct, removeProduct } from '../services/cartProducts';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: readCart(),
    };
  }

  toIncreaseItem = (product) => {
    const { products } = this.state;
    const objIndex = products.findIndex((p) => p.id === product.id);
    products[objIndex].quantity += 1;
    this.setState({ products });
    addProduct(product);
  };

  toDecreaseItem = (product) => {
    const { products } = this.state;
    const objIndex = products.findIndex((p) => p.id === product.id);
    if (products[objIndex].quantity > 1) {
      products[objIndex].quantity -= 1;
      this.setState({ products });
      decreaseProduct(product);
    }
  };

  toRemove = (product) => {
    const { products } = this.state;
    const objIndex = products.findIndex((p) => p.id === product.id);
    products.splice(objIndex, 1);
    this.setState({ products });
    removeProduct(product);
  };

  render() {
    const { products } = this.state;

    return (
      <div>
        { products.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          products.map((product, index) => (
            <div data-testid="product" key={ index }>
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{`R$ ${product.price}`}</p>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>

              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.toIncreaseItem(product) }
              >
                +
              </button>

              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.toDecreaseItem(product) }
              >
                -
              </button>

              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.toRemove(product) }
              >
                Remover
              </button>
            </div>
          ))
        ) }
      </div>
    );
  }
}

export default ShoppingCart;
