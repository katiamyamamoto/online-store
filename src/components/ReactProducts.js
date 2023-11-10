import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { addProduct } from '../services/cartProducts';

class ReactProducts extends Component {
  state = {
    clicked: false,
  };

  handleClick = (toRedirect) => {
    <Redirect to={ toRedirect } />;
    this.setState({
      clicked: true,
    });
  }; // =)

  render() {
    const { title, thumbnail, price, id } = this.props;
    const { clicked } = this.state;
    const toRedirect = `/product-details/${id}`;

    const addToCart = () => {
      const product = { title, thumbnail, price, id, quantity: 1 };
      addProduct(product);
    };
    return (
      <section data-testid="product">
        <div
          data-testid="product-detail-link"
          onClick={ () => this.handleClick(toRedirect) }
          onKeyDown={ () => this.handleClick(toRedirect) }
          role="button"
          tabIndex="0"
        >
          <p>{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{`R$ ${price}`}</p>
        </div>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => addToCart() }
        >
          Adicionar ao Carrinho
        </button>
        { clicked && <Redirect to={ toRedirect } /> }
      </section>
    );
  }
}

ReactProducts.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default ReactProducts;
