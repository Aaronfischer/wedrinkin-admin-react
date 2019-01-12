import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DrinkForm from '../forms/DrinkForm';

class DrinkPage extends Component {
  state = {
    drink: null,
  };

  async loadDrink(id) {
    let request = await fetchWrapper(`${process.env.REACT_APP_API_HOST}/drinks/${id}`, {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.setState({ drink: json.drinks });
    console.log('this.drink', this.state);
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    console.log('id', id);
    return this.loadDrink(id);
  };

  render() {
    const { drink, loading, errors } = this.state;
    return (
      <Container>
        <Header as='h1'>Drink</Header>
        {drink && <DrinkForm drink={drink} />}
      </Container>
    );
  }
}

export default DrinkPage;