import React from 'react';
import { getCategories, getProductByCategory } from '../services/api';
import CartBtn from '../components/CartBtn';
import ProductSearch from '../components/ProductSearch';
import ReactProducts from '../components/ReactProducts';

class Search extends React.Component {
  state = {
    categories: [],
    productsCategory: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const data = await getCategories();

    this.setState({
      categories: data,
    });
  };

  onClickButton = async (id) => {
    const productsCategoryId = await getProductByCategory(id);
    this.setState({
      productsCategory: productsCategoryId.results,
    });
  };

  render() {
    const { categories, productsCategory } = this.state;

    return (
      <div>

        <section data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </section>
        <section>
          {
            categories.map((category) => (
              <button
                key={ category.id }
                data-testid="category"
                type="button"
                onClick={ () => this.onClickButton(category.id) }
              >
                { category.name }
              </button>
            ))
          }
        </section>

        <CartBtn />

        <ProductSearch />
        <section>
          {productsCategory.map(({ title, thumbnail, price, id }) => (
            <div key={ id }>
              <ReactProducts
                title={ title }
                thumbnail={ thumbnail }
                price={ price }
                id={ id }
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;
