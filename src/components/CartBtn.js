import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartBtn extends Component {
  render() {
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingcart"><p>Carrinho</p></Link>
      </div>
    );
  }
}

export default CartBtn;
