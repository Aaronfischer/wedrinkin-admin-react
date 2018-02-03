import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import SearchDrinkForm from '../forms/SearchDrinkForm';
import DrinkForm from '../forms/DrinkForm';
import { createDrink } from '../../actions/drinks';

export class NewDrinkPage extends React.Component {
  state = {
    drink: null
  };

  onDrinkSelect = drink => this.setState({ drink });

  addDrink = drink =>
    this.props
      .createDrink(drink)
      .then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <Segment>
        <h1>Add new drink to your collection</h1>
        <SearchDrinkForm onDrinkSelect={this.onDrinkSelect} />

        {this.state.drink && (
          <DrinkForm submit={this.addDrink} drink={this.state.drink} />
        )}
      </Segment>
    );
  }
}

NewDrinkPage.propTypes = {
  createDrink: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createDrink })(NewDrinkPage);
