import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allDrinksSelector } from '../../reducers/drinks';
import AddDrinkCta from '../ctas/AddDrinkCta';
import DrinkList from '../parts/DrinkList';
import { Consumer } from '../../store';
// import { fetchDrinks } from '../../actions/drinks';

// class DashboardPage extends React.Component {
//   componentDidMount = () => {
//     console.log('componentDidMount', this.props);
//     return this.onInit(this.props)
//   };

//   onInit = props => {
//     console.log('props', props);
//     return props.fetchDrinks()
//   };

//   render() {
//     const { isConfirmed, drinks } = this.props;
//     console.log('this.props', this.props);
//     return (
//       <div>
//         {!isConfirmed && <ConfirmEmailMessage />}

//         {drinks.length === 0 ? <AddDrinkCta /> : <DrinkList drinks={drinks} />}
//       </div>
//     );
//   }
// }

const DashboardPage = () => {
  return (
    <Consumer
      mapStateToProps={state => ({
        drinks: state.drinks,
      })}
    >
    {({ drinks, actions }) => (
      <div>
        {/* {!state && <ConfirmEmailMessage />} */}

        {/* {drinks.length === 0 ? <AddDrinkCta /> : <DrinkList drinks={drinks} />} */}
        {/* {state.name} */}
      </div>
    )}
    </Consumer>
  )
};

DashboardPage.propTypes = {
  // isConfirmed: PropTypes.bool.isRequired,
  // fetchDrinks: PropTypes.func.isRequired,
  // drinks: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string.isRequired
  //   })
  // ).isRequired
};

// function mapStateToProps(store) {
//   return {
//     isConfirmed: !!store.user.confirmed,
//     drinks: allDrinksSelector(store),
//   };
// }

export default DashboardPage;
