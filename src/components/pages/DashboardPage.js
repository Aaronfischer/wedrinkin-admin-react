import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allDrinksSelector } from '../../reducers/drinks';
import AddDrinkCta from '../ctas/AddDrinkCta';
import { fetchDrinks } from '../../actions/drinks';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);
  onInit = props => props.fetchDrinks();

  render() {
    const { isConfirmed, drinks } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {drinks.length === 0 ? <AddDrinkCta /> : <p>You have drinks!</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    drinks: allDrinksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchDrinks })(DashboardPage);
