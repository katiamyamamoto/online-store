import React, { Component } from 'react';
import { getProductBySearch } from '../services/api';
import ReactProducts from './ReactProducts';

class ProductSearch extends Component {
  state = {
    valueInput: '',
    resultsSearch: [],
    notResults: undefined,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onButtonClick = async () => {
    const { valueInput } = this.state;
    const endpointProduct = await getProductBySearch(valueInput);
    this.setState({
      resultsSearch: endpointProduct.results,
    });
    this.resultsProduct();
  };

  resultsProduct = () => {
    const { resultsSearch } = this.state;
    if (resultsSearch.length !== 0) {
      this.setState({
        notResults: false,
      });
    } else {
      this.setState({
        notResults: true,
      });
    }
  };

  render() {
    const { valueInput, resultsSearch, notResults } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="query-input"
            value={ valueInput }
            onChange={ this.onInputChange }
            name="valueInput"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onButtonClick }
          >
            Buscar
          </button>
          {notResults ? (
            <section>
              {resultsSearch.map(({ title, thumbnail, price, id }) => (
                <div key={ id }>
                  <ReactProducts
                    title={ title }
                    thumbnail={ thumbnail }
                    price={ price }
                    id={ id }
                  />
                </div>
              ))}
            </section>) : (<p>Nenhum produto foi encontrado</p>)}

        </form>
      </div>
    );
  }
}

export default ProductSearch;
