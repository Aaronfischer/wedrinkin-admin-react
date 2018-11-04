import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import SearchDrinkForm from '../forms/SearchDrinkForm';
import DrinkForm from '../forms/DrinkForm';
import { createDrink } from '../../actions/drinks';

export class NewDrinkPage extends React.Component {
  state = {
    drink: {
      name: '',
      img: '',
      quote: '',
      temp: [],
      wind: '',
      time: [],
      city: '',
      country: '',
      region: '',
      ingredients: [],
      instructions: ''
    }
  };

  addDrink = drink =>
    this.props
      .createDrink(drink)
      .then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <Container>
        <h1>Add Drink</h1>
        {/*<SearchDrinkForm onDrinkSelect={this.onDrinkSelect} />*/}

        <DrinkForm submit={this.addDrink} drink={this.state.drink} />
      </Container>
    );
  }
}

NewDrinkPage.propTypes = {
  createDrink: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default NewDrinkPage;
