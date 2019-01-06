import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DrinkList from '../parts/DrinkList';
import AddDrinkCta from '../ctas/AddDrinkCta';

class DrinksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount = () => this.loadDrinks();

  async loadDrinks() {
    let request = await fetchWrapper(`http://localhost:9000/api/drinks`, {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.drinks = json.drinks;
  }

  render() {
    const { isConfirmed, drinks } = this.props;
    return (
      <div>
        <Header as='h1'>Drinks</Header>
        {/* {drinks.length === 0 ? <AddDrinkCta /> : <DrinkList drinks={drinks} />} */}
      </div>
    );
  }
}

export default DrinksPage;
