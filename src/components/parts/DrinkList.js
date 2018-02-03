import React from 'react';
import PropTypes from 'prop-types';

const DrinkList = ({ drinks }) => {
  return (
    <ul className="list-group">
      {drinks.map(drink => (
        <li className="list-group-item" key={drink._id}>
          {drink.name} - {drink.quote}
        </li>
      ))}
    </ul>
  );
};

DrinkList.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DrinkList;
