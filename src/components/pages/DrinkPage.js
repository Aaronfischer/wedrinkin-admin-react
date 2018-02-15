import React from 'react';
import { connect } from 'react-redux';
import { drinkSelector } from '../../reducers/drinks';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import SearchDrinkForm from '../forms/SearchDrinkForm';
import DrinkForm from '../forms/DrinkForm';
import { updateDrink, fetchDrink } from '../../actions/drinks';

export class DrinkPage extends React.Component {
  state = {
    data: null,
    loading: false,
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    return this.props.fetchDrink(id);
  };

  componentWillReceiveProps = (nextProps) => {
    // was re-rendered and got mapStateToProps.drink and can now set state
    // this is then passed to render and into the drinkform child component
    this.setState({ ...this.state, drink: nextProps.drink });
  };

  saveDrink = drink =>
    this.props
      .updateDrink(drink)
      .then(drinks => {
        const newDrink = drinks.data.entities.drinks[drink._id];
        // set the new state based on the drink that was updated
        this.setState({ ...this.state, drink: newDrink });
      });

  render() {
    const { drink } = this.state;
    console.log('render drink', drink);
    return (
      <Container>
        <h1>Edit Drink</h1>
        {drink && <DrinkForm submit={this.saveDrink} drink={drink} />}
      </Container>
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
  const id = ownProps.match.params.id;
  let mapState = {
    drink: drinkSelector(state, id)
  };
  console.log('mapState', mapState);
  return mapState;
}

export default connect(mapStateToProps, { updateDrink, fetchDrink })(DrinkPage);
