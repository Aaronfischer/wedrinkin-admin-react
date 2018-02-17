import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { allDrinksSelector } from '../../reducers/drinks';
import AddDrinkCta from '../ctas/AddDrinkCta';
import DrinkList from '../parts/DrinkList';
import { fetchDrinks } from '../../actions/drinks';

class DrinksPage extends React.Component {
  componentDidMount = () => this.props.fetchDrinks();

  render() {
    const { isConfirmed, drinks } = this.props;
    return (
      <div>
        <Header as='h1'>Drinks</Header>
        {drinks.length === 0 ? <AddDrinkCta /> : <DrinkList drinks={drinks} />}
      </div>
    );
  }
}

DrinksPage.propTypes = {
  fetchDrinks: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  let mapState = {
    drinks: allDrinksSelector(state)
  };
  console.log('mapState', mapState);
  return mapState;
}

export default connect(mapStateToProps, { fetchDrinks })(DrinksPage);
