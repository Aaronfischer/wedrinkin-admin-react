import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DrinkList = ({ drinks }) => {
  return (
    <ul className="list-group">
      {drinks.map(drink => (
        <li className="list-group-item" key={drink._id}>
          <Link to={`/drinks/${drink._id}`}>
            {drink.name} - {drink.quote}
          </Link>
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
