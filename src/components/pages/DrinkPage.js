import React from 'react';
import { connect } from 'react-redux';
import { drinkSelector } from '../../reducers/drinks';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import SearchDrinkForm from '../forms/SearchDrinkForm';
import DrinkForm from '../forms/DrinkForm';
import { updateDrink, fetchDrink } from '../../actions/drinks';

export class DrinkPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);
  onInit = props => {
    console.log('onInit', props);
    const id = props.match.params.id;
    console.log('id', id);
    return props.fetchDrink(id);
  };

  saveDrink = drink =>
    this.props.updateDrink(drink).then(() => console.log('save'));

  render() {
    const { drink } = this.props;
    console.log('render drink', drink);
    return (
      <Segment>
        <h1>Edit Drink</h1>
        <DrinkForm submit={this.saveDrink} drink={drink} />
      </Segment>
    );
  }
}

DrinkPage.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
  updateDrink: PropTypes.func.isRequired,
  drink: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps state', state);
  const id = ownProps.match.params.id;
  let mapState = {
    drink: drinkSelector(state, id)
  };
  console.log('mapState', mapState);
  return mapState;
}

export default connect(mapStateToProps, { updateDrink, fetchDrink })(DrinkPage);
