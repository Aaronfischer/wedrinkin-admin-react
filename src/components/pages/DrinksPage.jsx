import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DrinkList from '../parts/DrinkList';
import AddDrinkCta from '../ctas/AddDrinkCta';

class DrinksPage extends Component {
  constructor(props) {
    super(props);
    this.state = { drinks: [] }
  }

  componentDidMount = () => this.loadDrinks();

  async loadDrinks() {
    let request = await fetchWrapper(`${process.env.REACT_APP_API_HOST}/drinks`, {
      credentials: 'same-origin',
    });
    console.log('request', request);
    let json = await request.json();
    // this.drinks = json.drinks;
    console.log('json.drinks', json.drinks);
    this.setState({ drinks: json.drinks });
  }

  render() {
    const { isConfirmed, drinks } = this.state;
    return (
      <div>
        <Header as='h1'>Drinks</Header>
        {drinks.length === 0 ? <AddDrinkCta /> : <DrinkList drinks={drinks} />}
      </div>
    );
  }
}

export default DrinksPage;
