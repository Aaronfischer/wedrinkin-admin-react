import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchDrinkForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    drinks: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    console.log('data.value', data.value);
    this.props.onDrinkSelect(this.state.drinks[data.value]);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get(`/api/drinks/search?q=${this.state.query}`)
      .then(res => res.data.drinks)
      .then(drinks => {
        const options = [];
        const drinksHash = {};
        drinks.forEach(drink => {
          drinksHash[drink.id] = drink;
          options.push({
            key: drink.id,
            value: drink.id,
            text: drink.name
          });
        });
        this.setState({ loading: false, options, drinks: drinksHash });
      });
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a drink by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchDrinkForm.propTypes = {
  onDrinkSelect: PropTypes.func.isRequired
};

export default SearchDrinkForm;
