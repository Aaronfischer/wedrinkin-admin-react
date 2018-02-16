import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { allDrinksSelector } from '../../reducers/drinks';

const TopNavigation = ({ user, logout, hasDrinks }) => (
  <Menu size="tiny">
    <Menu.Item as={NavLink} to="/dashboard">
      Dashboard
    </Menu.Item>
    <Menu.Item as={NavLink} to="/drinks">
      Drinks
    </Menu.Item>
    {hasDrinks && (
      <Menu.Item as={NavLink} to="/drinks/add">
        Add New Drink
      </Menu.Item>
    )}
    <Menu.Menu position="right">
      <Dropdown item trigger={<Image avatar src={gravatarUrl(user.email)} />}>
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
  console.log('props', this.props);
  return {
    user: state.user,
    hasDrinks: allDrinksSelector(state).length > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
