import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { allDrinksSelector } from '../../reducers/drinks';

const TopNavigation = ({ user, logout, hasDrinks }) => (
  <Menu vertical inverted fixed="left" className="bg-dark">
    <Menu.Item as={NavLink} to="/dashboard">
      <strong>wedrinkin</strong>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Drinks</Menu.Header>
      <Menu.Menu>
        <Menu.Item as={NavLink} to="/drinks">
          Browse
        </Menu.Item>
        {hasDrinks && (
          <Menu.Item as={NavLink} to="/drinks/add">
            Add
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu.Item>
    <Dropdown item className="dropdown-icon-center" trigger={<Image avatar src={gravatarUrl(user.email)} />}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
