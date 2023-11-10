import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { addProduct } from '../services/cartProducts';

class Details extends Component {
  state = {
    title: '',
    price: '',
    thumbnail: '',
    clicked: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.makeFetch(id);
  }

  makeFetch = async (id) => {
    const API_URL = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    this.setState({
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      id,
    });
  };

  redirectToCart = () => {
    this.setState({
      clicked: true,
    });
  };

  addToCart = () => {
    const { title, price, thumbnail, id } = this.state;
    const product = { title, price, thumbnail, id, quantity: 1 };
    addProduct(product);
  };

  render() {
    const { title, price, thumbnail, clicked } = this.state;
    return (
      <main>
        <section>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        </section>
        <section>
          <h2>Especificações</h2>
          <p data-testid="product-detail-price">
            R$
            { price }
          </p>
          <button
            data-testid="shopping-cart-button"
            onClick={ this.redirectToCart }
          >
            Carrinho
          </button>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart() }
          >
            Adicionar ao Carrinho
          </button>
        </section>
        { clicked && <Redirect to="/shoppingcart" /> }
      </main>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
