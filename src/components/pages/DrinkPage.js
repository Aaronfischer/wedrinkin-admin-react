import React from 'react';
import { connect } from 'react-redux';
import { drinkSelector } from '../../reducers/drinks';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import SearchDrinkForm from '../forms/SearchDrinkForm';
import DrinkForm from '../forms/DrinkForm';
import { updateDrink, fetchDrink } from '../../actions/drinks';

export class DrinkPage extends React.Component {
  state = {
    drink: null
  };

  // componentDidMount(props) {
  //   console.log('componentDidMount props', props);
  // }
  componentDidMount = props => {
    console.log('componentDidMount', props);
    return this.onInit(this.props);
  };
  onInit = props => {
    console.log('onInit', props);
    const id = props.match.params.id;
    return props.fetchDrink(id);
  };

  saveDrink = drink =>
    this.props.updateDrink(drink).then(() => console.log('save'));

  render() {
    return (
      <Segment>
        <h1>Edit Drink</h1>
        <DrinkForm submit={this.saveDrink} drink={this.state.drink} />
      </Segment>
    );
  }
}

DrinkPage.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
  updateDrink: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('state', state);
  console.log('ownProps', ownProps);
  console.log('params.id', ownProps.match.params.id);
  const id = ownProps.match.params.id;
  return {
    drink: state.drink
  };
}

export default connect(mapStateToProps, { updateDrink, fetchDrink })(DrinkPage);
