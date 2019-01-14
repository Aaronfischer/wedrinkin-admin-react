import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DrinkForm from '../forms/DrinkForm';

class DrinksAddPage extends Component {
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

  render() {
    const { drink, loading, errors } = this.state;
    return (
      <Container>
        <Header as='h1'>Drink</Header>
        <DrinkForm drink={drink} />
      </Container>
    );
  }
}

export default DrinksAddPage;
