import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { allDrinksSelector } from '../../reducers/drinks';

const TopNavigation = ({ user, logout, hasDrinks }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    <Menu.Item as={Link} to="/drinks">
      Drinks
    </Menu.Item>
    {hasDrinks && (
      <Menu.Item as={Link} to="/drinks/new">
        Add New Drink
      </Menu.Item>
    )}
    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasDrinks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasDrinks: allDrinksSelector(state).length > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
