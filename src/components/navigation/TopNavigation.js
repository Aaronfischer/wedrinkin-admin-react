import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image, Button, Popup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
// import { connect } from 'react-redux';
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
    <Popup
      trigger={
        <Menu.Item>
          <Menu.Header>
            {/* <Image avatar floated="left" src={gravatarUrl(user.email)} /> */}
            {/* {user.firstName} {user.lastName} <br /> */}
            {/* <span className="small emphasis text-subtle">{user.email}</span> */}
          </Menu.Header>
        </Menu.Item>
      }
      position="right center"
      on="click"
      hideOnScroll
    >
      <a onClick={() => logout()}>Logout</a>
    </Popup>
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

export default TopNavigation;
